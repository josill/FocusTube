alert("hello")

function removeThumbnails() {
    // thumbnails = document.getElementById("yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded")
    let thumbnails = document.getElementsByClassName("ytd-thumbnail");
    for (let i=0; i<thumbnails.length; i++) {
        var thumbnail = thumbnails[i];
        thumbnail.style.pointerEvents = 'none';
        thumbnail.style.opacity = '0.5';
    }
}
removeThumbnails()
