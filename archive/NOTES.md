# NOTES


Renoise tools

https://www.renoise.com/tools/browse

Typescript

https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple

https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript

https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types

Renoise Lua

- https://github.com/renoise/xrnx

Books

- https://alpof.wordpress.com
- https://musictheory.pugetsound.edu/mt21c/frontmatter.html

Music Programming Languages

- https://opusmodus.com/

Rhythmic Serialization

- https://theconversation.com/how-a-little-mathematics-can-help-create-some-beautiful-music-61812
- https://theconversation.com/how-a-little-mathematics-can-help-create-some-beautiful-music-61812
- https://theconversation.com/how-a-little-mathematics-can-help-create-some-beautiful-music-61812

Other

- https://www.renoise.com/tools/cdp-interface

- https://www.pornhub.com/view_video.php?viewkey=ph63c4de75df352 <- this can recognise chords and stuff, its super cool

- https://luafun.github.io/reference.html
- https://luafun.github.io/generators.html#random-sampling
- https://luafun.github.io/transformations.html
- https://forum.renoise.com/t/question-about-renoise-lua-and-external-libraries/45189
- https://forum.renoise.com/t/using-external-lua-modules/29803
- https://files.renoise.com/xrnx/documentation/Renoise.Socket.API.lua.html
- https://scilua.org/sci_dist.html
- https://rosettacode.org/wiki/Statistics/Normal_distribution#Lua
- https://people.cs.umass.edu/~yannis/lc++/
- https://www.boost.org/doc/libs/1_81_0/doc/html/lambda.html
- https://yanniss.github.io/fc++/
- https://scilua.org/
- https://github.com/stepelu/lua-sci
- http://lua.space/art/making-music-in-lua
- https://en.cppreference.com/w/cpp/header/functional
- https://github.com/elihugarret/Moonlet
- https://studio.zerobrane.com/features
- https://github.com/createuniverses/praxis
- https://createuniverses.wordpress.com/
- https://www.softsynth.com/pforth/
- https://worp.zevv.nl/https://worp.zevv.nl/https://worp.zevv.nl/
- https://files.renoise.com/xrnx/documentation/Renoise.Socket.API.lua.html
- https://juce.com/
- https://www.geeksforgeeks.org/socket-programming-cc/
- https://en.wikipedia.org/wiki/List_of_numerical_libraries
- https://llvm.org/
- https://llvm.org/pubs/2008-10-04-ACAT-LLVM-Intro.pdf
- https://llvm.org/docs/
- https://github.com/nschloe/awesome-scientific-computing
- https://www.boost.org/doc/libs/
- https://www.philipzucker.com/notes/Languages/datalog/#souffle
- https://github.com/luafun/luafun
- https://www.philipzucker.com/notes/
- https://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html
- https://newtonality.net/lab

Pitch Serialization

- https://harmoniousapp.net/p/ff/Glossary-Forte-Number
- https://musictheory.pugetsound.edu/mt21c/ForteNumbers.html
- https://www.reddit.com/r/musictheory/comments/90v3i8/pitchclass_set_theory/

```
Let's say you have four pitches: D3, F#5, C2, and B♭3.
Your first step is obviously to ignore the octave placement of the pitch: [D, F#, C, B♭]
Secondly, arrange the remaining pitches classes in an order that minimizes the space between the first and the last pitch class: [B♭, C, D, F#]
This is called the normal form.
Next, turn these into numbers based on their semitonal equivalent, i.e. 0 is C: [10, 0, 2, 6]
Next, transpose all of these numbers based on the first number being zero: (0248)
IF you have a case where the last two pitches in the set are closer together than the first two, first invert the set.
```

- https://www.reddit.com/r/musictheory/comments/gbzxvh/comment/fp8kjjt/

```
While this may be convenient for mathematical set theory, it is far less so for pitch class set theory. Chiral sets should have a method of identifying which mirror twin you are dealing with otherwise there is no differentiation between different musical scales. This is seen most obviously in pitch class set 7-32 which treats the Harmonic Minor and Harmonic Major as the same thing - which they self evidently are not.
```

- https://www.reddit.com/r/musictheory/comments/g4l5vo/comment/fnyo0gd/

```
Sorry to be a know-it-all, but the ordering of the Forte numbers isn't directly based on compactness. 4-6 is (0127) while 4-7 is (0145), more compact than the former. Forte's original ordering used the interval-class vector: 4-1 comes first because it has the highest value in the first place in the interval vector. So this correlates to compactness in a loose way, but not an exact one. 4-6 is less compact overall, but it has an ic2, which is earlier in the interval class vector.
```

- https://musictheory.pugetsound.edu/mt21c/ListsOfSetClasses.html

```
List of forte set classes
```

- https://alpof.wordpress.com/2018/03/25/networks-in-transformational-music-theory-1/

```
interesting article on set theory
```