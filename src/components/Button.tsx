import * as React from 'react'

interface ButtonProps {
  text: string,
  isLoading?: boolean
};

export default (props: ButtonProps) => {
  return (
    <button>
      {props.text}
      {props.isLoading && <span>...</span>}
    </button>
  );
};
