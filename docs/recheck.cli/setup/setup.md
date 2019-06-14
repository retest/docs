Setting up the CLI
==================

You can download the latest release from GitHub. 
To install it, simply unzip it to e.g. `C:\Program Files\recheck.cli-1.0.0`. 
Then you only need to add the `recheck.cmd` file (or `recheck` on Unix-like systems) to your path.
This heavily depends on your operating system and version thereof.

For example, for Windows 10, it works like this: Open Settings. 
In the search box enter “env” and select “Edit the system environment variables.” 
Then click on tab “Advanced” -> “Environment Variables” -> “Path” -> “Edit” -> “New.” 
Then add the path to the `recheck/bin` folder. If you installed it under the path above, that would be `C:\Program Files\recheck.cli-1.0.0\bin\`.

![Setting up the environment variables in Windows 10](env_variables.png)

Now you can verify whether this worked correctly by typing `recheck --version` into a newly started CMD.
The output should show the current version of recheck, i.e. `recheck CLI version 1.0.0`.
