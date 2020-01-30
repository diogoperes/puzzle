![](https://github.com/diogoperes/puzzle/blob/master/site/img/puzzle.gif)

[![Build Status](https://travis-ci.org/diogoperes/puzzle.svg?branch=master)](https://travis-ci.org/diogoperes/puzzle)

# Puzle Game

This project is a puzzle game that fetches random images from [picsum](https://picsum.photos/) and generates a multiple puzzle pieces.


## Instructions

To play open the website and press the start button once the puzzle loads.

Change difficulty by opening the menu and clicking the top buttons. 
Once you press a puzzle image it will create a new puzzle with the chosen difficulty.

You can also chose if the pieces will rotate or not in the side menu. To rotate a piece double click in it.

Connect the pieces outside the puzzle area ( pieces are only connected in the correct rotation, upwards ) or place the directly on the puzzle area.

If a piece is in the right place inside the puzzle container it will stick to it and have white borders.

Lost a piece by changing the browser size? Click on the `Arrange` button. This will rearrange all the pieces inside view.

Hope you have fun! :D Any ideas will be welcome, to contact me use the contact area at [my personal website](http://www.mrperes.com/)

## Contribute

Contributions will be welcome. :v:

### Development

Clone this repo to your PC and open a terminal on the created folder.
Run the following command to start the development server.

```
npm start
```

This will launch a server on `localhost:3000` with hot reload.

### Releasing

The release process is automated with travis although to do it manually follow the steps bellow.

* Open a terminal on the project root folder and run `npm start build`.
* Create a subtree branch to push to github pages only the build folder with the commands steps:
  * Run the command: `git subtree split --prefix build -b gh-pages`
  * copy output hash
  * Run `git push origin {hash}:gh-pages --force`
  * Run `git branch -D gh-pages`

## Next steps

* Add a button to load a local image;
* Enhance image loading and mitigate errors
* Add languages
* Add tests
