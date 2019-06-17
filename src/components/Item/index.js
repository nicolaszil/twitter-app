import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';

const styles = {
  likes: {
    span: {
      marginRight: '5px',
    },
  },
};

const Item = ({
  author,
  date,
  content,
  likesCount,
  retweetCount,
}) => {
  if (!author || !content) return null;

  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a>{author}</a>
          <Feed.Date>Il y a {moment(date, 'HH:mm').fromNow(true)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          {content}
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" />
            <span style={styles.likes.span}>{likesCount}</span>
          </Feed.Like>
          <Feed.Like>
            <Icon name="retweet" />
            <span style={styles.likes.span}>{retweetCount}</span>
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

Item.defaultProps = {};

Item.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  likesCount: PropTypes.number,
  retweetCount: PropTypes.number,
};

export default Item;
