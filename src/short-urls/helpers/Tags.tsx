import { FC } from 'react';
import { isEmpty } from 'ramda';
import { Tag } from '../../tags/helpers/Tag';
import { ColorGenerator } from '../../utils/services/ColorGenerator';

interface TagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  colorGenerator: ColorGenerator;
}

export const Tags: FC<TagsProps> = ({ tags, onTagClick, colorGenerator }) => {
  if (isEmpty(tags)) {
    return <i className="indivisible"><small>No tags</small></i>;
  }

  return (
    <>
      {tags.map((tag) => (
        <Tag
          key={tag}
          text={tag}
          colorGenerator={colorGenerator}
          onClick={() => onTagClick?.(tag)}
        />
      ))}
    </>
  );
};