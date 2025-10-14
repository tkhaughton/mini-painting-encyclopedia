import pandas as pd
import sqlite3
import sys

def validateTable(entriesDf, relationshipsDf, akasDf):
    
    wrongRelationships1 = [item for item in relationshipsDf['title1'].values if item not in entriesDf['title'].values]
    wrongRelationships2 = [item for item in relationshipsDf['title2'].values if item not in entriesDf['title'].values]
    wrongAkas = [item for item in akasDf['title'].values if item not in entriesDf['title'].values]
    
    if wrongRelationships1:
        print (wrongRelationships1, " in Relationships-title1 not in entries list")        
    if wrongRelationships2:
        print (wrongRelationships2, " in Relationships-title2 not in entries list")        
    if wrongAkas:
        print (wrongAkas, " in akas not in entries list")
    
    if wrongRelationships1 or wrongRelationships2 or wrongAkas:
        raise ValueError("Values without match found in AKA or Relationship database")
    
def createEntryTable(entriesDF, con):
    
    con.execute("DROP TABLE IF EXISTS entries")
    #con.execute("CREATE VIRTUAL TABLE entries USING fts5(title, type, tool, description, fundamental)")
    con.execute("CREATE TABLE entries(title TEXT PRIMARY KEY, type TEXT NOT NULL, tool TEXT, description TEXT, fundamental INTEGER NOT NULL)")
    entriesDF.to_sql(name="entries", con=con, if_exists="append", index=False)

def createAkasTable(akasDF, con):
    
    con.execute("DROP TABLE IF EXISTS akas")
    con.execute("CREATE VIRTUAL TABLE akas USING fts5(aka, title)")
    akasDF.to_sql(name="akas", con=con, if_exists="append", index=False)

def createRelationshipsTable(relationshipsDF, con):
    con.execute("DROP TABLE IF EXISTS relationships")
    con.execute("CREATE TABLE relationships(id INTEGER PRIMARY KEY AUTOINCREMENT, title1 TEXT NOT NULL, title2 TEXT NOT NULL, relationship INTEGER NOT NULL)")
    for index, row in relationshipsDF.iterrows():
        # Create entries appropriately depending on whether they're prerequisite/postrequisite or related skills
        if row["relationship"] == 1:
            con.execute("INSERT INTO relationships (title1, title2, relationship) VALUES (?, ?, ?)", (row["title1"], row["title2"], 1))
            con.execute("INSERT INTO relationships (title1, title2, relationship) VALUES (?, ?, ?)", (row["title2"], row["title1"], 2))
        else:
            con.execute("INSERT INTO relationships (title1, title2, relationship) VALUES (?, ?, ?)", (row["title1"], row["title2"], 3))
            con.execute("INSERT INTO relationships (title1, title2, relationship) VALUES (?, ?, ?)", (row["title2"], row["title1"], 3))
    con.commit()
        
            
if __name__ == "__main__":

    filename = sys.argv[1]
    dbName = sys.argv[2]
    entries = pd.read_excel(io=filename,
                                sheet_name="Entries_Test")
    relationships = pd.read_excel(io=filename,
                                sheet_name="Relationships")
    akas = pd.read_excel(io=filename,
                                sheet_name="AKAs")

    validateTable(entriesDf=entries,
                relationshipsDf=relationships,
                akasDf=akas)
    with sqlite3.connect(dbName) as con:
        createEntryTable(entries, con)
        createAkasTable(akas, con)
        createRelationshipsTable(relationships, con)

