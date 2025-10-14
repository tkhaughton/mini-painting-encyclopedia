import functools
import json

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)

from backend.db import get_db

bp = Blueprint('entry', __name__, url_prefix='/entry')

@bp.route('/lookup/<entry>', methods=(['GET']))

def get_entry(entry):
    """Gets all information for one entry in the encyclopedia.

    Args:
        entry (string): title of the entry

    Returns:
        Response: dict containing the entry converted into a JSON response
    """

    db=get_db()

    # Get the first result matching the title

    results = db.execute(
        "SELECT title, type, tool, description, fundamental FROM entries WHERE title = ?",
        (entry,)).fetchone()
    
    relationships = db.execute("SELECT title2, relationship FROM relationships WHERE title1 = ? AND (relationship = 1 OR relationship = 3)",
                               (entry,)).fetchall()
    
    #aka title versions still have spaces in them, so supply version of entry with spaces as argument
    akas = db.execute("SELECT aka FROM akas WHERE title = ? AND aka != ?",
                      (entry, entry.replace("_", " "),)).fetchall()
    
    #return jsonify([results])
    return jsonify([results, relationships, akas])

@bp.route('/search/<query>', methods=(['GET']))
def search(query):
    """Searches the aka table for any entries matching the query

    Args:
        query (string): query being searched for

    Returns:
        Response: a list of dicts matching the query converted to JSON
    """
    db = get_db()

    # Note for this later - if you wanted to add full text search on description, you could do two queries, combine them with python (sorting out unique entries) and then
    # sort by rank after
    return jsonify(db.execute(
        "SELECT DISTINCT entries.title, type, tool, description, fundamental FROM akas LEFT JOIN entries ON akas.title = entries.title WHERE aka MATCH ? ORDER BY rank",
        (query,)).fetchall())

@bp.route('/allentries', methods=(['GET']))
def getAllEntries():

    db = get_db()

    return jsonify(db.execute(
        "SELECT aka, title FROM akas")
        .fetchall())

"""
@bp.route('/addtest', methods=(['GET', 'POST']))
def add_test_entry():

    db = get_db()

    data = [('airbrush',
              'tool',
              'airbrush',
              'paintgun',
              0),
            ('value',
              'concept',
              None,
              "Value, or brightness, is one of the three main characteristics of paint (the other two being chroma and hue). In the art world, value is often measured in value scales from 1 to 9, with 9 being as bright as pitch black, 1 being the brightness of pure white, and 5 being a “neutral” brightness (sometimes a 1 to 10 scale is also used)",
              1
              ),
            ('chroma',
              'concept',
              None,
              "Chroma, or saturation, is one of the three main characteristics of paint (the other two being value and hue). While saturation is technically a term with a slightly different meaning, referring to the color purity of light rather than of paint, many use the two terms interchangeably, with saturation being the more common term in the miniature painting world.",
              1
              ),
            ('hue',
              'concept',
              None,
              'Hue, or color, is one of the three main characteristics of paint (the other two being chroma and value).  Hue is the color of paint as you might understand it - red, yellow, blue, green, purple, etc. Of the three fundamental attributes of paint, hue is the least important to creating a “believable” paint scheme. (as this author once read in a comment, when it comes to painting, value will make or break your painting, chroma is less important but can still break a painting if done poorly, and with hue, you can get away with murder if the other two are right).',
              1
              )]
    db.executemany(
        "INSERT INTO entries (title, type, tool, description, fundamental) VALUES (?, ?, ?, ?, ?)",
        data
    )
    db.commit()

    title = 'airbrush'
    return jsonify(tuple(db.execute(
        "SELECT * FROM entries WHERE title = ?",
        (title,)
        ).fetchall()))

"""

"""
@bp.route('/add/<entry>', methods=(['POST']))
def add_entry():

    db = get_db()

    db.execute(
        "INSERT INTO entries (title, aka, type, tool, description, fundamental)" 
    )
"""