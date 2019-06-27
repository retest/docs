# Dateien und Verzeichnisse in retest

**Achtung:** Dies ist ein noch unvollständiger Entwurf!

retest-Installationsverzeichnis
-------------------------------

Dieser Ordner sollte eine *unberührte* retest-Installation beinhalten, genau so wie sie durch das Entpacken der
retest-Datei von https://update.retest.de/ entsteht.

Um retest zu aktualisieren, ersetzen Sie diesen Ordner komplett mit dem Inhalt der neuen ZIP-Datei. Beim automatischen
Update werden ältere Versionen mit dem Suffix `_old_$DATE_OF_REPLACEMENT` versehen.

![Warning](../../icons/warning.png) **Achtung:** Sie sollten *niemals* Dateien in diesem Ordner editieren! Sämtliche
Änderungen können beim nächsten Update überschrieben werden.

retest-Workspace
----------------

Dieser Ordner enthält alle veränderlichen Dateien einer retest-Installation, wie die
[Konfigurationsdatei](konfigurationsdatei.md), die [Lizenzdatei](lizenz.md) und weitere operationale Dateien.

Standardmäßig befindet sich das Verzeichnis `retest-workspace` auf der gleichen Ebene wie das
retest-Installationsverzeichnis. Wenn die System-Property `de.retest.configFile` gesetzt ist, dann wird standardmäßig
der Elternordner dieser Datei als Workspace genutzt. Der retest-Workspace kann mit der System-Property
`de.retest.workDirectory` und einer absoluten Pfadangabe gesetzt werden.

SUT-Verzeichnis
---------------

Dieser Ordner enthält alle Dateien die benötig werden, um die [SUT](../testprozess/was-ist-die-sut.md) zu starten.
Standardmäßig (z. B. für die [Demo](https://update.retest.de/demo/) befindet sich dieses Verzeichnis neben dem
retest-Installationsverzeichnis unter dem Namen `system-under-test`. Sollte es sich bei Ihrer Anwendung um eine
Web-Start-Anwendung handeln, so wird dieser Ordner erstellt und alle JAR-Dateien werden dorthin abgespeichert. Name und
Pfad können mit der System-Property `de.retest.sut.applicationPath` angepasst werden.

retest-Ausführungsverzeichnis
-----------------------------

Aus diesem Verzeichnis heraus wir die SUT gestartet. Derzeit muss dies auch das retest-Ausführungsverzeichnis von retest
selbst sein. Standardmäßig ist dies das SUT-Verzeichnis. Name und Pfad können mit der System-Property
`de.retest.sut.executionDirectory` angepasst werden.

