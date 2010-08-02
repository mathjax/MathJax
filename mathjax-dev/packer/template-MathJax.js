/*************************************************************
 *
 *  MathJax.js
 *  
 *  The main code for the MathJax math-typesetting library.  See 
 *  http://www.mathjax.org/ for details.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2009-2010 Design Science, Inc.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

if (!window.MathJax) {window.MathJax = {}}

MathJax.Unpack = function (data) {
  var k, d, n, m, i;
  for (k = 0, m = data.length; k < m; k++) {
    d = data[k];
    for (i = 0, n = d.length; i < n; i++)
      {if (typeof(d[i]) == 'number') {d[i] = d[d[i]]}}
    data[k] = d.join('');
  }
  eval(data.join(''));
};
MathJax.isPacked = true;

MathJax.Unpack([
%%%DATA%%%]);

