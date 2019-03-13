
Die stabile Testumgebung
========================

Ein wichtiger Punkt in Bezug auf die Testfälle ist deren Unabhängigkeit voneinander.
Unabhängigkeit bedeutet, dass wenn Tests bspw. in der Reihenfolge `A`, `B`, `C` ablaufen,
dass Test `B` keine Abhängigkeiten zu `A` hat und Test `C` keine Abhängigkeiten zu `B` oder `A`.

Solche Abhängigkeiten entstehen häufig unbewusst, bspw. indem in Test `B` mit Daten gearbeitet wird, 
welche auch in Test `A` bearbeitet oder sogar erst angelegt werden. 

Abhängigkeiten zwischen Tests können weitreichende negative Folgen haben.
So können Tests nicht mehr unabhängig voneinander abgespielt werden:

* Wenn Test `A` fehlschlägt schlagen automatisch auch Test `B` und `C` fehl, 
  wodurch keine Aussage mehr getroffen werden kann, wie weitreichend ein Problem tatsächlich ist:
  Schlagen die Tests fehl, weil ein Problem alle Tests betrifft, oder nur aufgrund (ungewollter) Abhängigkeiten?

* Man kann die Testreihenfolge nicht mehr ändern. 
  Dadurch kann man auch Tests nicht mehr beliebig provisionieren und verteilt oder parallel ausführen.
  
* Man kann Tests nicht mehr einzeln abspielen. 
  Wenn bspw. nur Test `C` fehlschlägt, dieser aber von `A` und `B` abhängig ist, 
  führt dies bei der Diagnose und Behebung des Problems unter Umständen zu enormen Zeitverlusten.

Ähnlich wie in der Programmierung selbst, entsteht außerdem eine [Kopplung](https://de.wikipedia.org/wiki/Lose_Kopplung), 
welche sich negativ auf die Wartbarkeit der Tests auswirkt.
Tests können also nicht mehr unabhängig voneinander geändert werden:
  
* Wenn sich der Test `A` ändert, müssen ebenfalls die Tests `B` und `C` angepasst werden,
  was einen erhöhten Wartungsaufwand und größere Fehlerwahrscheinlichkeit zur Folge hat.
  
* Umgekeht muss man zum Anpassen des Tests `C` potentiell auch den Test `A` und `B` verstehen oder kennen,
  um die Herkunft der Daten und / oder die Richtigkeit der Prüfregeln nachvollziehen zu können.
  
Diese Probleme klingen auf den ersten Blick nicht besonders "schlimm".
Für eine komplexere Software können aber relativ schnell aus hunderten von Tests mehrere Tausend Tests werden.
Und diese dann Warten zu müssen kann den wirtschaftlichen Nutzen der Testautomatisierung schnell auffressen.
In mehr als einem Projekt wurden aus diesem Grund die automatischen Tests irgendwann komplett verworfen,
was einen enormen wirtschaftlichen Verlust bedeutet.  
 
Testumgebungen zurücksetzen
---------------------------

Um diesen Problemen wirkungsvoll entgegen zu treten und diese Abhängigkeiten gar nicht erst (auch nicht unbewusst und ungewollt) entstehen zu lassen,
empfiehlt es sich die Testumgebung gleich so aufzusetzen, dass man sie schnell und einfach in einen definierten Urzustand "zurücksetzen" kann.
In den Zeiten von [Virtualisierung](https://de.wikipedia.org/wiki/Virtualisierung_(Informatik)) mit [VirtualBox](https://www.virtualbox.org), [VMware](http://www.vmware.com) und [Hyper-V](https://de.wikipedia.org/wiki/Hyper-V) 
und Containerizierung mit [Docker](https://www.docker.com), [Vagrant](https://www.vagrantup.com) und Co. ist dies zum Glück kein Problem mehr.
Ebenso stellt dies (je nach Szenario) üblicherweise auch kein Performance-Problem mehr dar, 
da im schlimmsten Fall mit Werkzeugen wir [Ansible](https://www.ansible.com), [Chef](https://www.chef.io/), [Saltstack](https://saltstack.com/) und [Puppet](https://puppet.com) eine relativ einfache Verteilung und Parallelisierung in der Cloud möglich ist.

Falls Sie eine solche Lösung anstreben, aber nicht wissen wie Sie sie umsetzen sollen, [sprechen Sie uns an](https://retest.de/kontakt.html).

Wie empfehlen die Testumgebung so häufig wie möglich zurückzusetzen -- am Besten vor dem Aufzeichnen bzw. Umwandeln jeder einzelnen Suite.
Um das Zurücksetzen der SUT zu Automatisieren empfehlen wir sogenannte "[Hooks](../konfiguration/konfigurationsdatei.md)".

