const fs = require('fs');

const ENCODING_MAPPING = {};
ENCODING_MAPPING[NSUTF8StringEncoding] = "utf8";
ENCODING_MAPPING[NSISOLatin1StringEncoding] = "latin1";

NSString = class NSString {
  static alloc() {
    return new NSString();
  }

  initWithContentsOfFile_encoding_error_(fullpath, encoding, _){
    return fs.readFileSync(fullpath, ENCODING_MAPPING[encoding]);
  }
}
