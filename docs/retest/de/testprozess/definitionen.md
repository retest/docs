# Definitionen

retest verwendet mehrere Begriffe, die einer näheren Erläuterung bedürfen:

* Eine Datei mit der Endung `.actions` enthält eine Folge von Aktionen, auch genannt eine Aktionssequenz.
  Diese Aktionen enthalten noch keine Zustandsinformationen und können deshalb nicht zum Prüfen der [SUT](was-ist-die-sut.md) verwendet werden.
  Man kann Aktionssequenzen auf der Maske "[Aktionsfolge aufzeichnen](../recapture/aktionsfolge-aufzeichnen.md)" aufzeichnen und abspeichern.
  Um eine Aktionssequenz mit Zustandsinformationen anzureichern und damit als Test bzw. Suite ausführbar zu machen, muss sie [einzeln](../recapture/aktionsfolge-umwandeln.md)
  oder als [Bestandteil einer Suite](../recapture/suite-umwandeln.md) zu einer ausführbaren Suite *umgewandelt* werden.
* Eine ausführbare Suite (Englisch "executable suite") hat in retest die Dateiendung `.execsuite`.
  Eine ausführbare Suite enthält Zustandsinformationen über die SUT und kann deshalb zur Überprüfung derselben ausgeführt werden -- deshalb der Name.
  Jede ausführbare Suite sollte von allen anderen Suites mittels einer [stabilen Testumgebung](stabile-testumgebung.md) entkoppelt sein.
* Eine Datei mit der Endung `.test` enthält eine Folge von Aktionssequenzen, welche auf der Maske "[Test zusammenstellen](../recapture/test-zusammenstellen.md)" baukastenartig zu einem Test zusammengefasst wurden.
* Eine Datei mit der Endung `.suite` enthält eine Folge von Tests, welche auf der Maske "[Suite zusammenstellen](../recapture/suite-zusammenstellen)" baukastenartig zu einer Suite zusammengestellt wurden.
* Eine Datei mit der Endung `.ignore` enthält eine Sammlung an UI-Elementen und Attributen. Sie kann beim Affentesten zum Black- und Whitelisting verwendet werden, und beim Prüfen der Testergebnisse zum [dauerhaften Ignorieren von Elementen und/oder Attributen](../review/ui-elemente-ignorieren.md).

Wo sich die jeweiligen Dateien befinden kann in der [Konfigurationsdatei](../konfiguration/konfigurationsdatei.md) festgelegt werden.

