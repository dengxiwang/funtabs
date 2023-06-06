export default function transformToBookmarks(data) {
  var html = "<!DOCTYPE NETSCAPE-Bookmark-file-1\"><!--This is an automatically generated file.It will be read and overwritten.DO NOT EDIT! --><META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=UTF-8\"><TITLE>Bookmarks</TITLE><H1>Bookmarks</H1><DL><p>"

  for (var i = 0; i < data.length; i++) {
    var bookmark = data[i];
    html += "<DT><H3 ADD_DATE=\" 1652183341\" LAST_MODIFIED=\"1675741258\" PERSONAL_TOOLBAR_FOLDER=\"true\">" + bookmark.label + "</H3><DL><p>";
    html += folderBookmarks(bookmark.content);
    html += "</DL><p>";
  }

  html += "</DL><p>";
  return html;
}

function folderBookmarks(data) {
  var html = ""
  for (var i = 0; i < data.length; i++) {
    var bookmark = data[i];
    if (bookmark.type === "folder") {
      html += "<DT><H3>" + bookmark.label + "</H3><DL><p>";
      html += folderBookmarks(bookmark.content);
      html += "</DL><p>";
    } else if (bookmark.type === "link") {
      html += "<DT><A HREF=\"" + bookmark.link + "\" ADD_DATE=\"" + bookmark.id + "\">" + bookmark.label + "</A>";
    }
  }
  return html;
}
