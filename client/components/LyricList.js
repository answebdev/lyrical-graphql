import React, { Component } from 'react';

class LyricList extends Component {
  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
        </li>
      );
    });
  }
// Fetch and update data after mutation is called (different approach)
  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

export default LyricList;
