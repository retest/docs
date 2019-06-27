# Die Testumgebung

Natürlich sollte die neue Software getestet werden *bevor* sie installiert / ausgerollt wird.
Auch wenn dies (je nach Szenario) eventuell technisch möglich ist und häufig mit weniger Aufwand verbunden ist, so empfiehlt es sich trotzdem *nicht* direkt auf den Produktisystemen bzw. der Produktivumgebung zu testen, 
damit die zu testende Software keinen Schaden für den produktiven Betrieb anrichten kann und die Durchführung der Tests (z.B. Lasttests, Ändern von Testdaten) keine Auswirkungen auf die Produktivumgebung hat.

Deshalb benötigt man also eine [Testumgebung](https://de.wikipedia.org/wiki/Testumgebung):

> Eine Testumgebung (Englisch 'Test Environment') ist die technisch-organisatorische Infrastruktur, die zum Testen von Software benutzt wird.

[aus Wikipedia](https://de.wikipedia.org/wiki/Testumgebung)

Aus oben genannten Gründen sollte die Testumgebung von der Produktivumgebung getrennt sein.
Gleichzeitig sollte die Testumgebung der Produktivumgebung so ähnlich wie möglich sein, 
weil jede Abweichung der beiden Umgebungen Probleme in der Software während der Durchführung der Tests in der Testumgebung "maskieren" kann, 
sodass diese erst in der Produktivumgebung auftreten.

Eine häufige Ursache solcher Abweichungen sind unterschiedliche Daten.
Deshalb ist bei der Erzeugung bzw. Auswahl der Testdaten besonderen Wert darauf zu legen, 
dass die Daten in Umfang und Inhalt repräsentativ sind und insbesondere alle Speziel- bzw. Problemfälle enthalten sind.

Außerdem sollte die Testumgebung [stabil](stabile-testumgebung.md) sein.

