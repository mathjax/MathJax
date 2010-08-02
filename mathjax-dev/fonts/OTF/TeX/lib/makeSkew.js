// Creates the skew data needed for skew.pl
// (jsMath already has this data, so use that rather than write another
//  program to read the TeX data files.  It's a hack.)

// Use jsMath lab and use debugger to enter
//  and copy and paste the output into the skew.pl file

ff = jsMath.TeX.cmmi10; for (i=0; i< ff.length; i++) {if (ff[i].krn && ff[i].krn['127']) {debug("  0x"+i.toString(16).toUpperCase()+" => "+ff[i].krn['127']+",")}}
ff = jsMath.TeX.cmmib10; for (i=0; i< ff.length; i++) {if (ff[i].krn && ff[i].krn['127']) {debug("  0x"+i.toString(16).toUpperCase()+" => "+ff[i].krn['127']+",")}}

ff = jsMath.TeX.cmsy10; for (i=0; i< ff.length; i++) {if (ff[i].krn && ff[i].krn['48']) {debug("  0x"+i.toString(16).toUpperCase()+" => "+ff[i].krn['48']+",")}}
ff = jsMath.TeX.cmbsy10; for (i=0; i< ff.length; i++) {if (ff[i].krn && ff[i].krn['48']) {debug("  0x"+i.toString(16).toUpperCase()+" => "+ff[i].krn['48']+",")}}

ff = jsMath.TeX.rsfs10; for (i=0; i< ff.length; i++) {if (ff[i].krn && ff[i].krn['127']) {debug("  0x"+i.toString(16).toUpperCase()+" => "+ff[i].krn['127']+",")}}
