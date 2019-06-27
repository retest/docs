# Wie man retest konfiguriert

Damit retest Ihre SUT starten kann, müssen diverse Werte in die [`retest.properties`-Datei](../konfiguration/konfigurationsdatei.md) eingetragen werden:

1. Die Main-Klasse Ihrer SUT wird im Parameter `de.retest.sut.mainClass` erfasst.
1. Zusätzliche Programm-Argumente können mithilfe von `de.retest.sut.mainArgs` eingetragen werden.
1. Mittels `de.retest.sut.applicationClassPath` werden die JARs Ihrer SUT bestimmt. Zum Separieren mehrerer Angaben wird unter Windows `;` verwendet, \*nix-Systeme verwenden `:`.
1. `de.retest.sut.dependenciesClassPath` bietet die Möglichkeit, zusätzliche Abhängigkeiten oder dergleichen einzubinden. Auch hier können Sie mit `;` bzw. `:` mehrere Angaben machen.

Sollten Sie nicht das retest-Standardlayout verwenden, sprich die SUT befindet *nicht* im Nachbarordner `system-under-test` von `retest`, so können Sie via `de.retest.sut.applicationPath` den entsprechenden Installationspfad bestimmen.

