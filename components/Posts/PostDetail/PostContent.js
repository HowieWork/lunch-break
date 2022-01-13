import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './PostHeader';

import classes from './PostContent.module.css';
import React from 'react';

const PostContent = (props) => {
  // EXTRACT POST INFO
  const { slug, title, date, duration, image, content } = props.post;

  // COVER IMAGE PATH
  const imagePath = `/images/posts/${slug}/${image}`;

  // MARKDOWN CUSTOM COMPONENTS: IMG P CODE
  const customComponents = {
    img(image) {
      return (
        <Image
          src={`/images/posts/${slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },

    p(paragraph) {
      const { node } = paragraph;
      // FIX CONSOLE WARNING: DIV CANNOT BE DESCENDENT OF P
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1];

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <div className={classes['container']}>
      {/* TODO ADD READING STATUS FEATURE */}
      {/* <aside className={classes['side-bar-container']}>STATUS | SOCIAL SHARE</aside> */}

      <article className={classes['post-container']}>
        <PostHeader
          title={title}
          image={imagePath}
          date={date}
          duration={duration}
        />
        <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default PostContent;
