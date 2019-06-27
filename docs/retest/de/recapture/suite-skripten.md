# Suite skripten

___
![Warning](../../icons/warning.png) Achtung: Folgendes Feature ist nur im Power-User-Mode verfügbar!
___

Suites können mithilfe einer [CSV-Datei](https://de.wikipedia.org/wiki/CSV_(Dateiformat)) in mehrere Execsuites exportiert werden.

Das Skripten von Suites ist eine erweiterte Funktion in [Suite umwandeln](suite-umwandeln.md). 

## Variablen

Variablen werden bei [Aktionsfolge skripten](aktionsfolge-skripten.md) definiert. Jede Variable hat einen eindeutigen Namen, ein Typ und kann typischerweise einem Attribut zugeordnet werden. Einer Variable kann man durch eine CSV-Datei einen Wert zuweisen.

#### Variablentyp

Der Variablentyp wird durch das Attribut definiert, zu der die Variable zugeordnet ist. Dieser Typ muss mit dem Wert der Variablen übereinstimmen, da die Aktion den Variablenwert verwendet um z.B. das Ziel zu bestimmen oder die Aktion auszuführen. 

Stimmt der Variablentyp nicht überein, so kann der Wert nicht verwendet werden und es wird als Fehler behandelt. Ist der Wert nicht gesetzt, so wird der aufgezeichnete Wert des Attributs genommen, als würde die Variable nicht existieren.

Beispiele für Variablennamen:  
* vorname
* nachname
* adresse

#### Namenskollision

Eine Variable kann auch mehreren Attributen zugeordnet werden, indem der gleiche Name bei unterschiedlichen Attributen definiert wird (*Kollision*). Hierbei sollte allerdings überprüft werden, ob alle Attribute den **gleichen Typ und Bedeutung** haben. 

Wo eine Kollision hilfreich bzw. nicht hilfreich sein kann:
* *Hilfreich:* Beim Eintragen eines Vornamens in mehrere Textfelder.
* *Nicht hilfreich:* Zwei Textfelder mit jeweils dem Vornamen und Nachnamen.

#### Typen

Typ | Erlaubte Werte | Beispiel
--- | -------------- | ---
Class | Alle vorhandenen [Java Klassen](https://docs.oracle.com/javase/6/docs/api/) | javax.swing.JButton
String | Alle Zeichenketten | Max Mustermann
Integer | Alle Zahlenwerte von [Minimum bis Maximum](https://docs.oracle.com/javase/6/docs/api/constant-values.html#java.lang.Integer.MAX_VALUE) | 123
Boolean | true, false, True, False, TRUE, FALSE | true
Mouse-Click-Mode | Click, RightClick, DoubleClick | Click
Key-Modifier | Integer Masken von [`java.awt.event.InputEvent`](https://docs.oracle.com/javase/6/docs/api/constant-values.html#java.awt.event.InputEvent.SHIFT_MASK) | 1 (für Shift)
Date | Datum im Format: MM/dd/yyyy HH:mm:ss | 01/01/2018 00:00:01
Path | retest-Pfad einer Komponente der Sut | Window/JRootPane_0/JLayeredPane_0/JButton_0

## CSV-Datei

[CSV-Dateien](https://de.wikipedia.org/wiki/CSV_(Dateiformat)) werden als Tabellen mit Spaltenüberschrift interpretiert. Als Trennzeichen gilt: `;`. Die Dateien werden vom Verzeichnis `execsuites` im [Workspace](../konfiguration/verzeichnisse.md) geladen.

### Aufbau

Die erste Zeile repräsentiert die Spaltenüberschrift, wobei die erste Spalte ignoriert wird (im Folgenden immer mit *Variablenname* ersetzt). Dort werden die Testnamen definiert und repräsentieren einzelne Testabläufe. Testnamen müssen nie leer sein und nie mehrfach vorkommen.

Die erste Spalte repräsentiert die benutzten Variablen anhand ihres Namens. Es müssen alle Variablen angegeben sein. Die Werte werden in die entsprechenden Spalten der Zeile eingetragen.

### Beispiel

CSV-Datei `beispiel1.csv`:
```text
;Test1;Test2;Test3
variable-A;Wert-1;Wert-2;Wert-3
variable-B;Wert-4;;Wert-5
```
Tabelle für `beispiel1.csv`:
Variablenname | Test1  | Test2  | Test3  
------------- | ------ | ------ | -----
variable-A    | Wert-1 | Wert-2 | Wert-3
variable-B    | Wert-4 |        | Wert-5

### Hilfreiches

Importieren oder Exportieren von [Excel zu CSV](https://support.office.com/de-de/article/importieren-oder-exportieren-von-textdateien-txt-oder-csv-5250ac4c-663c-47ce-937b-339e391393ba?ui=de-DE&rs=de-DE&ad=DE).

