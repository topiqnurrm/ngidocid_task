// detail.js
import StoryAPI from '../api/storyApi';

const Detail = {
  async render() {
    return `
      <section>
        <h2>Detail Cerita</h2>
        <div id="story-detail"></div>
      </section>
    `;
  },

  async afterRender() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const storyId = urlParams.get('id');
    
    if (!storyId) {
      document.getElementById('story-detail').innerHTML = '<p>ID cerita tidak ditemukan.</p>';
      return;
    }

    try {
      const story = await StoryAPI.getStoryById(storyId);
      document.getElementById('story-detail').innerHTML = `
        <h3>${story.name}</h3>
        <img src="${story.photoUrl}" alt="Gambar Cerita" />
        <p>${story.description}</p>
        ${story.lat && story.lon ? `<p>Lokasi: ${story.lat}, ${story.lon}</p>` : ''}
      `;
    } catch (error) {
      document.getElementById('story-detail').innerHTML = '<p>Gagal memuat cerita.</p>';
    }
  }
};

export default Detail;
