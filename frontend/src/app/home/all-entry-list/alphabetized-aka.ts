import { Aka } from "../../entry/aka";

//Interface for an alphabetized AKA object that contains a letter, and all the AKAs that start wiht that letter
export interface AlphabetizedAka {
    letter: string;
    akas: Aka[];
}
