This directory holds the various tools used to create the data used by 
MathJax for its fonts.  Most include a makeAll command that you can run to 
create the needed files.  Some create data that you need to copy (by hand) 
into one of MathJax's existing files.  The comments in the makeAll file 
should help you find out where the data is supposed to go.

You should build things in this order:

OTF -- to create the MathJax font files
AFM -- to create the data needed for the fontdata.js files
IMG -- to create the image files for the MathJax fonts
AMS -- to create to data needed for the AMS symbols
Tables -- to create HTML font tables showing the fonts

Some of the directories refer to files created in the other directories, so 
you may need to do the earlier steps in order to do the latter ones.

Note that for the OTF fonts, you will need to get a copy of batik-1.7 (see 
http://xmlgraphics.apache.org/batik/) and unpack it in the OTF/TeX/lib 
directory.  Other tools that you will need include fontforge, mftrace, 
dvipng, and (of course) TeX.  You may need to edit the code in order to 
change the paths to some of these tools.

Some of the scripts refer to the ~/Library/Fonts directory, which is where 
MacOS stores user-installed fonts.  You may need to change that if you are 
running on a different operating system.

Finally, some of the scripts use "open -a AlphaX ..." to open a data file 
that is to be copied into some other file.  This is the editor I use on 
MacOS, so you may need to remove those lines, or substitute your own editor 
instead.