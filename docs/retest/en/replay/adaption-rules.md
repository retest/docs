
Adaption Rules
==============

Here you can edit rules to change tests as they are replayed.
	We call this "passive update".
  This gives much greater flexibility to adapt a large set of recorded or generated tests, while at the same time being much less effort.
  It also allows to make tests much more flexible and adaptable, by e.g. allowing popups to appear or disappear and treat them accordingly.
</p>
<p>
	The language to define those rules is <a href="https://github.com/beanshell/beanshell/wiki/Introduction">BeanShell</a>. 
	A quick introduction into the basic syntax can be found <a href="https://github.com/beanshell/beanshell/wiki/Basic-syntax">here</a>.
	It is essentially simplified Java.
</p>
<p>
  The order in which the scripts are executed during replay is as follows:
</p>
<ul>
	<li>
	  First, additional actions are inserted into the test and directly executed, as long as actions are returned from the "insert actions" script.
    If more than the configured property "de.retest.maxInsertedActions" actions are inserted, an exception is triggered, to avoid endless loops.
  </li>
  <li>
    Then, the "nextAction" is skipped, if the "skip action" script returns <em>true</em>.
  </li>
  <li> 
    If the action isn't skipped, it is modified according to the "change action" script.
  </li>
</ul>
<p>
  Keep this order in mind when referencing predefined variables in the script.
  Predefined variables are:
</p>
<ul>
	<li><em>windows</em> referencing a list of the current windows</li>
	<li><em>previousAction</em> references the previously executed action. This refers to the last inserted action, if an action was inserted.</li>
	<li><em>nextAction</em> references the next to be executed action.</li>
</ul>
<p>
	More commands and information can be found in the <a href="https://www.retest.de/docs/en/replay/adaptions-regeln.html">online documentation</a>.
	If you feel that the information passed to the scripts in insufficient to your needs, please contact support (left bottom).
</p>

<p>
  For some simple examples of BeanShell, please have a look at our demo. 
</p>
