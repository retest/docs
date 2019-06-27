# Aktionsfolge skripten

___
![Warning](../../icons/warning.png) Achtung: Folgendes Feature ist nur im Power-User-Mode verfügbar!
___

Das Skripten einer Aktionsfolge erlaubt zusätzlich zum [Editieren einer Aktionsfolge](aktionsfolge-bearbeiten.md), dass einzelne Aktionen direkt verändert werden können. Dabei lassen sich die Werte der Aktion (*Aktionsattribute*) oder sogar die Ziele der Aktion (*Identifikationsattribute*) verändern.

Es können hier die Variablennamen für das [Skripten von Suites](suite-skripten.md) definiert werden, um dynamisch beim Umwandeln der Suite mehrere Execsuites für den gleichen Ablauf zu generieren.

### Aktionsattribute

Die Aktionsattribute definieren, was eine Aktion ausführt. So lässt sich z. B. über die Aktionsattribute der Text verändern, der in ein Textfeld eingetragen wird oder stattdessen eine andere Datei im Datei-Dialog auswählen.

### Identifikationsattribute

Die Identifikationsattribute definieren das Ziel der Aktion. So lässt sich durch Verändern der Attribute ein anderes Ziel (z. B. das darunterliegende Textfeld) ausgewählt werden.

Da retest alle Attribute nutzt, um das entsprechede Ziel zu finden, reicht es meist nicht, dass man nur den Text einer Schaltfäche ändert. Will man jedoch nur das Ziel ändern, ist es meist genauer, eine Aktion auf dem neuen Ziel aufzuzeichnen. Das kann auch dazu verwendet werden, um die zugehörigen Attribute des Ziels für die Variablennamen herauszufinden und diese dann auf die gewüschte Aktion zu übertragen.

### Variablen

Mit Variablennamen wird ein Attribut identifizierbar. Der Name kann für das [Skripten von Suites](suite-skripten.md) verwendet werden, um andere Werte beim Umwandeln in die Attribute zu füllen, damit das oben beschriebene Verhalten erzielt wird. Mehr Informationen beim Skripten von Suites.

### Bearbeiten der Aktion

Nach dem Öffnen einer Aktion kann man im Tab "Aktionsdetails" die Werte und Variablennamen der Aktion ändern bzw. setzen.

Um einen Wert oder Variablenname zu ändern, muss zum Editieren einfach in die Tabelle auf das entsprechende Feld geklicken werden. Ist das Feld nicht editierbar, so wird das Ändern des Werts bzw. Setzen des Variablennamens nicht unterstützt.

Das Setzen eines Variablennamens hat für sich alleine keine Auswirkung auf das Abspielen einer Aktion. Diese werden beim [Scripten von Suites](suite-skripten.md) verwendet.

Nach durchgeführten Änderungen, muss die Aktion abgespeichert werden.

## Achtung

Das starke Verändern einer Aktion kann den Ablauf der Aktionsfolge beeinflussen. Diese Änderungen müssen entweder manuell durch das Einfügen zusätzlicher Aktionen korrigiert werden oder in [Adaptionsregeln](../replay/adaptions-regeln.md) muss eine neue Regel definiert werden.

