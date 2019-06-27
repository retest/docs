# Integration in ein Build-System

Wird retest bspw. in ein Build-System integriert, so sollte die Ausführung nicht über die GUI erfolgen. Generell ist es sinnvoll, retest dauerhaft in Ihr Build-System zu integrieren. Hierfür stellt retest eine eigene Kommandozeile (engl. Command Line Interface, CLI) zur Verfügung. Dadurch ist die Integration in gängige Build-Systeme problemlos möglich. Falls Sie hierbei Unterstützung benötigen, so sprechen Sie uns gerne an. Haben Sie eine Integration durchgeführt, so lassen Sie es uns gerne wissen, damit wir dies hier dokumentieren können.

## retest CLI

Das retest CLI sollte unter Windows über die mitgelieferte `retest.bat` (unter \*nix Systemen mittels dem `retest` Executable) angesprochen werden. In der Kommandozeile können Sie dann mit `retest --help` (oder `-h`) folgende Hilfe aufrufen:

```
$ retest --help
Usage: retest [-hv]
Start the retest GUI.
  -h, --help                  Display this help message.
  -v, --version               Display version info.
Commands:
  convert   Convert the given suites.
  replay    Replay the given execsuites.
  generate  Generate new execsuites.
  update    Update retest installation.
  migrate   Migrate all retest files to installed version.
```

Jedes Kommando bietet selbst nochmal die Möglichkeit, eine Hilfe mit `--help` bzw. `-h` aufzurufen:

```
$ retest replay --help
Usage: replay [<execsuites>]...
Replay the given execsuites.
      [<execsuites>]...       Execsuites to replay. Leave blank to replay all
                                execsuites in the workspace.
```

Am Beispiel des `replay` Kommando ist zu sehen, dass sich das retest CLI grundsätzlich an Git und dergleichen orientiert. `replay` etwa erwartet (wie z. B. `git add`) eine Liste von Dateien, genau genommen eine Liste von Execsuites, welche ausgeführt werden sollen. Die Dateinamen sind stets relativ zum jeweiligen Ordner, sprich im Fall von Execsuites relativ zu `retest-workspace/execsuites`. Werden keine Execsuites übergeben, so werden dort alle Execsuites ausgeführt.

Beispiel: Integration in Maven
------------------------------

Zur Integration in Maven bietet sich das [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) an, welches der Ausführung von Executables und Java-Programmen via Maven dient. Eine Konfiguration könnte hierbei wie folgt aussehen:

```
<project>
  ...
  <build>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>1.6.0</version>
        <executions>
          <execution>
            ...
            <goals>
              <goal>exec</goal>
            </goals>
          </execution>
        </executions>
        <configuration>
          <executable>retest</executable>
          <arguments>
            <argument>replay</argument>
            <argument>my-execsuite-0.execsuite</argument>
            <argument>my-execsuite-1.execsuite</argument>
            ...
          </arguments>
        </configuration>
      </plugin>
    </plugins>
  </build>
   ...
</project>
```

Wie zu sehen ist, ruft das Plugin zunächst das `retest` Executable auf, gefolgt vom Kommando `replay` und entsprechenden Execsuites.

