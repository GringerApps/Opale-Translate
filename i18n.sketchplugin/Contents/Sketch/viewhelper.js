const { SCALE_FACTOR } = require('./consts');

const scaleFrame = (frame) => {
  const origin = frame.origin;
  const size = frame.size;
  return NSMakeRect(origin.x * SCALE_FACTOR, origin.y * SCALE_FACTOR, size.width * SCALE_FACTOR, size.height * SCALE_FACTOR); 
};

module.exports = {
  scaleFrame
};