import React from 'react';

const ShowNotice = ({ notice }) => {
  if (!notice.message)
    return '';

  return (
    <div className={`alert alert-${notice.type}`}>
      {notice.message}
    </div>
  )
};

export default ShowNotice;
