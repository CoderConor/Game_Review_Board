import React from 'react';

export default function Rating(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        <i
          className={
            //   Below outlines the stars to be displayed on the ratings, ie greater or=1 show a full star etc
            props.value >= 1
              ? 'fa fa-star'
              : props.value >= 0.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 2
              ? 'fa fa-star'
              : props.value >= 1.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 3
              ? 'fa fa-star'
              : props.value >= 2.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 4
              ? 'fa fa-star'
              : props.value >= 3.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 5
              ? 'fa fa-star'
              : props.value >= 4.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      {/* below displays the text part of a users */}
      <span>{props.text ? props.text : ''}</span>
    </div>
  );
}