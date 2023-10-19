---
title: Working with PDF, DJVU and EPUB
tags:
  - Daily
lang: en_US
---

Despite my reluctance to get along with this Internet world,
I appreciate that we have some many e-books available online.
This richness of knowledge and literature material excites me
and serves as an invaluable offer from our age.
The reading experience might be terrible comparing to paper books,
but I am used to it now.
In this post, I share my experience of performing different useful
daily tasks involving e-books of formats:
[PDF](https://en.wikipedia.org/wiki/Portable_Document_Format), [DjVu](https://en.wikipedia.org/wiki/DjVu) and [EPUB](https://en.wikipedia.org/wiki/EPUB).

## PDF compatible issues

It happens that PDF documents produced by different tools might
be not compatible with all possible PDF document reader or printer softwares.
The command `ps2pdf` from [Ghostscript](https://www.ghostscript.com/)
solves this problem perfectly.
The usage is as easy as follows:

```sh
ps2pdf old-problematic.pdf new-pefect.pdf
```

## Reduce PDF file size

For non-scanned PDF ^[For example, PDF documents produced by LaTex, Adobe InDesign or
some Print-to-PDF tools.],
one can again use the `ps2pdf` command mentioned above.
If the result of the plain command given above didn't reduce the file size,
one adjust the [distiller parameters](https://ghostscript.readthedocs.io/en/latest/VectorDevices.html#controls-and-features-specific-to-postscript-and-pdf-input)
by supplying the `-dPDFSETTINGS=/ebook` argument
, as an example here, to the command `ps2pdf`.

For scanned PDF documents from images, it is highly recommended
to convert them into DjVu documents.
See [the following section](#convert-scanned-pdf) for details.

## Convert scanned PDF

DjVu format, pronounced as _déjà-vu_,
is designed to compress scanned images into a document.
To start with, we create a working directory and then extract
all images with names _D-XXX.pbm_ or _D-XXX.ppm_.

```sh
mkdir -p /tmp/var/extract
cd /tmp/var/extract
pdfimages a-large-scanned-document.pdf D
```

Now in our working directory we usually have two different types of images:

1. PBM, _Portable Bit Map_ for black and white images;
2. PPM, _Portable Pixel Map_ usually meant for colorful images.

If there are only few PPM format images, they are usually
the book cover or front images.
I suggest to keep them colorful since they won't take too much space.
But if all images are of PPM format,
that is not necessary at all.
We should better convert them into PBM format images to reduce the document size efficiently.
To convert images, we use the `convert` command from [ImageMagick](https://imagemagick.org/index.php).
At this stage, we are able to improve the contrast or details
of the scanned document pages.
We tune an exemplar image with varying parameters
and preview the results
with the `display` command to find the best parameters
for current document.
Please refer to the [-blur parameter](https://imagemagick.org/script/command-line-options.php#blur) for better adjustment.

```sh
convert -blur 2x0.3 -threshold 73% D-011.ppm /tmp/tmp.pbm && display /tmp/tmp.pbm
```

In case that the examplar image (D-011.ppm) is of inverted color, that is say,
with white text and black background,
we should add the [`-negate`](https://imagemagick.org/script/command-line-options.php#negate) argument immediately after the `convert` command.
Also, sometimes one may need to replace the margins of pages by pure white blanks,
which can be done by combining the [`-shave`](https://imagemagick.org/Usage/crop/#shave)
and [`-border`](https://imagemagick.org/script/command-line-options.php#border) arguments:

```sh
convert -negate -shave 80x100 -bordercolor white -border 80x100 D-011.pbm /tmp/tmp.pbm && display /tmp/tmp.pbm
```

After finding out the best adjustment,
we first create subdirectories to store processed images and
futur converted DjVu pages.
Then we use a `for` loop to convert all images.

```sh
mkdir opt-img djvu
for file in D*.pbm;  do
    convert -blur 2x0.3 -threshold 73% $file opt-img/${file:r}.pbm;
done
```

You should decide which images to be processed.
In the above example, I only process the PBM images
since usually I keep those very few PPM images.
After this image processing step, we should now convert
each images into single page DjVu files.

```sh
cd opt-img
for file in *.pbm; do
    cjb2 $file ../djvu/${file:r}.djvu;
done
```

Here the command `cjb2` from [DjVuLibre](https://djvu.sourceforge.net/)
can convert PBM images to single page DjVu files.
For PPM images, we should use the `c44` command from DjVuLibre instead.
Here is an example to convert some few PPM images,
i.e., four files from _D-000.ppm_ to _D-003.ppm_.

```sh
cd /var/tmp/extract
for file in 00{0..3}; do
    c44 D-$file.ppm djvu/D-$file.djvu
done
```

Finally, we combine all single pages DjVu files into
a DjVu document using the `djvm` command provided by DjVuLibre.

```sh
cd /var/tmp/extract
djvm -c my-awesome-and-light-document.djvu djvu/*
```

## Add bookmarks

For a textbook in the formats PDF or DjVu,
it would be convenient that one can use bookmarks or outlines provided
by the document to help us jump between different chapters.
To do so, we need the page numbers corresponding to chapters or sections.
This is usually presented in the document, precisely in the pages for _Table of Content_.
Hence, we should first extract those page numbers data.
^[The extraction could be complicated
in some cases, see my [comments](https://github.com/JingMatrix/Shell/blob/master/toc/README.md).]
Then we edit them to a form that programs can easily process
and we should add reasonable extra data, such as page offsets since
the page 1 in the _table of content_ of a book is
usually not the first page of a document.
Finally we embed these data into our documents.

```sh
# Extract the table of content from a PDF document that locates at pages 8 and 9.
pdftotext -f 8 -l 9 -layout this-document-need-bookmarks.pdf toc-raw


# Perform the same task for a DjVu document
pdftotext -pages=8-9 this-document-also-need-bookmarks.djvu toc-raw
```

I have processed many raw data of table of contents extracted from books,
please use [this file](https://github.com/JingMatrix/Shell/blob/master/toc/tocAIMordenApproach) as a standard example,
where I used `\t` indent for bookmark levels and `d=13` to indicate the page offsets,
i.e., shifting 13 pages.
I also made scripts `add_bkmk` and `export_bkmk` to embed or export bookmarks,
one can find them [here](https://github.com/JingMatrix/Shell/tree/master/scripts).

```sh
./add_bkmk this-document-will-get-bookmarks.pdf toc-processed
```

As for EPUB documents, use `Sigil` in the [section for EPUB](#epub-documents).

## EPUB documents

I use [Sigil](https://github.com/Sigil-Ebook/Sigil) ^[On the wayland platform, QT is buggy;
to fix it, one use instead xwayland through the environment variable `QT_QPA_PLATFORM=xcb`.]
to edit EPUB documents.
Since many tasks are more efficiently performed without graphical interfaces
with possible stupid designs, I wrote [this script](https://github.com/JingMatrix/Shell/blob/master/scripts/epub)
to do some basic things such as:

1. upgrade to EPUB 2 documents;
2. [tidy](https://www.html-tidy.org/) `html` files;
3. fix errors detected by [epubcheck](https://github.com/w3c/epubcheck).

I store and read all my edited EPUB books on [Google Play Books](https://play.google.com/books/ebooks).

## Print webpages

The dedicated tool for this task is [wkhtmltopdf](https://wkhtmltopdf.org/).
I once made a web page for my [curriculum vitae](https://jingmatrix.github.io/cv/)
so that I can always print it to a PDF file with this convenient tool.

## Document reader softwares

I recommend [zathura](https://pwmt.org/projects/zathura/) for
reading PDF and DjVu on computers;
here is my [zathurarc](https://github.com/JingMatrix/Shell/blob/master/zathurarc) file if you are interested.
For mobile platforms, [ReadEra](https://readera.org/fr/book-reader) seems to be the best.

## Texts from image based documents

[Optical character recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)
or optical character reader (OCR) is designed to achieve this goal.
One has many tools based on [tesseract](https://github.com/tesseract-ocr/tesseract),
such [ocrmypdf](https://ocrmypdf.readthedocs.io/en/latest/) and [ocrodjvu](https://github.com/jwilk-archive/ocrodjvu).
For mathematical documents, one can consider the commercial product [Mathpix](https://mathpix.com/)
or the open source project [LaTex-OCR](https://github.com/lukas-blecher/LaTeX-OCR).

## Download e-books

Usually, I use [Library Genesis](http://libgen.is/) and [ZLibary](https://en.1lib.fr/) for English books.
For Chinese books, I rely on direct searches with Google or search engines for shared files
on [阿里云盘](https://www.aliyundrive.com/), such as [UP云搜](https://www.upyunso.com/).
To download shared files on 阿里云盘, I wrote the script [aliyun-share](https://github.com/JingMatrix/Shell/blob/master/scripts/aliyun-share) to store shared files data or download a file via its id.

```sh
# Download folder files metadata from a share URL
./aliyun-share https://www.aliyundrive.com/s/9y1gY9mbhfk/folder/625538b114ca25f59c1643ea9f2ecde089f32271

# Download a specific file with id
aliyun-share 625538b9b3e1a10642784adb8c7443d4e6dd9aaf
```
