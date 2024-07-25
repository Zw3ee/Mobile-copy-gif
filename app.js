async function copyGifAsBlob(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      showNotification("GIF copied to clipboard!");
    } catch (error) {
      console.error('Error copying GIF to clipboard: ', error);
      showNotification(`Failed to copy GIF: ${error.message}`);
    }
  }
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
  
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
  
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 1000);
  }
  
  document.getElementById('gifImage').addEventListener('click', () => {
    copyGifAsBlob('gifs/1.gif');
  });
  