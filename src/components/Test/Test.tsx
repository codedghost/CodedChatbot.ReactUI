import * as React from "react";
import {Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { shuffle } from "lodash";

import './Test.scss';

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300
};

interface colorModel {
  id: number;
  color: string;
  type: number;
}

const Example = () => {
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setTimeout(() => {
      let firstSet = colors.filter(c => c.type === 0);
      let secondSet = colors.filter(c => c.type === 1);

      firstSet = shuffle(firstSet);
      secondSet = shuffle(secondSet);
      setColors(firstSet.concat(secondSet));
    }, 10000);
  }, []);

  function AddItem() {
      setColors([...colors, {color: Math.floor(Math.random()*16777215).toString(16), type: Math.floor(Math.random() * 2)} as colorModel]);
  }

  return (
    <div>
      <AnimateSharedLayout>
        <div className="current">
          {colors.map((background) => {
            return background === colors[0] ? (
              <motion.div
                key={background.id}
                layout
                transition={spring}
                layoutId={background.id}
                style={{ color: background.color }}
              >
              <div>I am a current element {background.color} {background.type}</div>
          </motion.div>
            )
          })}
        </div>
          <div className="leftColumn">
            {colors.map((background) => {
          let uniqueStyle = background.color;
          
          return background.type === 0 ? (
          <motion.div
            key={uniqueStyle}
            layout
            transition={spring}
            style={{ color: uniqueStyle }}
          >
              <div>I am a first element {background.color} {background.type}</div>
          </motion.div>
          ) : (<></>)
            })
          }
          </div>
          <div className="rightColumn">
          { colors.map((background) => {
          let uniqueStyle = background.color;
          
          return background.type === 1 ? (<motion.div
            key={uniqueStyle}
            layout
            transition={spring}
            style={{ color: uniqueStyle }}
          >
              <div>I am a second element {background.color} {background.type}</div>
          </motion.div>) : (<></>)
          })
          }
          </div>
      </AnimateSharedLayout>
      <Button onClick={() => AddItem()}>Click me</Button>
    </div>
  );
};

const initialColors = [{
  id: 1,
  color: "#FF008C",
  type: 0
}, 
{
  id: 2,
  color: "#D309E1",
  type: 0
}, 
{
  id: 3,
  color: "#9C1AFF", 
  type: 1
}, 
{
  id: 4,
  color: "#7700FF", 
  type: 1
}];

export default Example;