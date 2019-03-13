
Integration in einen CI-Server
==============================

**Achtung:** Dies ist ein noch unvollständiger Entwurf!

Einfache Testreports für CI-Server
----------------------------------

Basierend auf dem [Test Anything Protocol (TAP)](https://testanything.org/) erstellt retest einen einfachen und übersichtlichen Testreport nach jeder via CLI angestoßenen Ausführung von Execsuites. Die zugehörige Datei findet sich standardmäßig unter `${RETEST_WORKSPACE}/latest_report.tap`.

Zur Integration in gängige CI-Server existiert in der Regel ein entsprechendes Plugin. Für Jenkins etwa kann das [TAP Plugin](https://wiki.jenkins-ci.org/display/JENKINS/TAP+Plugin) genutzt werden. Fügen Sie hierzu in der Konfiguration Ihres Jenkins-Projekts die Post-Build-Aktion "Publish TAP Results" hinzu, dabei empfehlen wir folgende Konfiguration:

- [x] Verbose (if checked will print a message for each TAP stream file)
- [x] Fail the build if no test results (files) are found
- [ ] Failed tests mark build as failure
- [x] Output TAP to console
- [x] Enable subtests
- [ ] Discard old reports
- [ ] TODO directive fails a test
- [x] Include comment diagnostics (#) in the results table
- [x] Validate number of tests
- [x] Is TAP plan required?
- [ ] Show only failures
- [ ] Strip single parents
- [ ] Flatten TAP result
- [ ] Skip if build not successful

Von nun an können Sie direkt in Jenkins die Testergebnisse von retest begutachten, welche sich ebenfalls auf das Build-Ergebnis (keine Differences: grün, Differences: gelb, Errors: rot) auswirken.

