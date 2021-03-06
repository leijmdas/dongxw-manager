/* Blob.js
 * A Blob implementation.
 * 2014-05-27
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/* global self, unescape */
/* jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

/* Baturu改进版，用在es6+、webpack下 */
/* eslint
   no-param-reassign: 0,
   no-new: 0,
   no-console: 0,
   new-parens: 0,
   camelcase: 0,
   one-var: 0,
   prefer-destructuring: 0,
   no-plusplus: 0,
   prefer-const: 0,
   no-multi-assign: 0,
   consistent-return: 0,
   no-restricted-globals: 0,
   no-mixed-operators: 0
*/
export default (function Blob(view) {
  view.URL = view.URL || view.webkitURL;

  if (view.Blob && view.URL) {
    try {
      new view.Blob;
      return view.Blob;
    } catch (e) { console.error(e.stack || e); }
  }

  // Internally we use a BlobBuilder implementation to base Blob off of
  // in order to support older browsers that only have BlobBuilder
  const BlobBuilder = view.BlobBuilder
    || view.WebKitBlobBuilder
    || view.MozBlobBuilder
    || (function BlobBuilder() {
      let
        get_class = function get_class(object) {
          return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        },
        FakeBlobBuilder = function FakeBlobBuilder() {
          this.data = [];
        },
        FakeBlob = function FakeBlob(data, type, encoding) {
          this.data = data;
          this.size = data.length;
          this.type = type;
          this.encoding = encoding;
        },
        FBB_proto = FakeBlobBuilder.prototype,
        FB_proto = FakeBlob.prototype,
        FileReaderSync = view.FileReaderSync,
        FileException = function FileException(type) {
          this.code = this[this.name = type];
        },
        file_ex_codes = (
          'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR '
          + 'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'
        ).split(' '),
        file_ex_code = file_ex_codes.length,
        real_URL = view.URL || view.webkitURL || view,
        real_create_object_URL = real_URL.createObjectURL,
        real_revoke_object_URL = real_URL.revokeObjectURL,
        URL = real_URL,
        btoa = view.btoa,
        atob = view.atob,

        ArrayBuffer = view.ArrayBuffer,
        Uint8Array = view.Uint8Array;
      FakeBlob.fake = FB_proto.fake = true;
      while (file_ex_code--) {
        FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
      }
      if (!real_URL.createObjectURL) {
        URL = view.URL = {};
      }
      URL.createObjectURL = (blob) => {
        let
          type = blob.type,
          data_URI_header;
        if (type === null) {
          type = 'application/octet-stream';
        }
        if (blob instanceof FakeBlob) {
          data_URI_header = `data:${type}`;
          if (blob.encoding === 'base64') {
            return `${data_URI_header};base64,${blob.data}`;
          } else if (blob.encoding === 'URI') {
            return `${data_URI_header},${decodeURIComponent(blob.data)}`;
          }
          if (btoa) {
            return `${data_URI_header};base64,${btoa(blob.data)}`;
          }
          return `${data_URI_header},${encodeURIComponent(blob.data)}`;
        } else if (real_create_object_URL) {
          return real_create_object_URL.call(real_URL, blob);
        }
      };
      URL.revokeObjectURL = (object_URL) => {
        if (object_URL.substring(0, 5) !== 'data:' && real_revoke_object_URL) {
          real_revoke_object_URL.call(real_URL, object_URL);
        }
      };
      FBB_proto.append = function append(data/* , endings */) {
        let bb = this.data;
        // decode data to a binary string
        if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
          let
            str = '',
            buf = new Uint8Array(data),
            i = 0,
            buf_len = buf.length;
          for (; i < buf_len; i++) {
            str += String.fromCharCode(buf[i]);
          }
          bb.push(str);
        } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
          if (FileReaderSync) {
            let fr = new FileReaderSync;
            bb.push(fr.readAsBinaryString(data));
          } else {
            // async FileReader won't work as BlobBuilder is sync
            throw new FileException('NOT_READABLE_ERR');
          }
        } else if (data instanceof FakeBlob) {
          if (data.encoding === 'base64' && atob) {
            bb.push(atob(data.data));
          } else if (data.encoding === 'URI') {
            bb.push(decodeURIComponent(data.data));
          } else if (data.encoding === 'raw') {
            bb.push(data.data);
          }
        } else {
          if (typeof data !== 'string') {
            data += ''; // convert unsupported types to strings
          }
          // decode UTF-16 to binary string
          bb.push(unescape(encodeURIComponent(data)));
        }
      };
      FBB_proto.getBlob = function getBlob(type) {
        if (!arguments.length) {
          type = null;
        }
        return new FakeBlob(this.data.join(''), type, 'raw');
      };
      FBB_proto.toString = () => '[object BlobBuilder]';
      FB_proto.slice = function slice(start, end, type) {
        let args = arguments.length;
        if (args < 3) {
          type = null;
        }
        return new FakeBlob(
          this.data.slice(start, args > 1 ? end : this.data.length)
          , type
          , this.encoding
          ,
        );
      };
      FB_proto.toString = () => '[object Blob]';
      FB_proto.close = function close() {
        this.size = this.data.length = 0;
      };
      return FakeBlobBuilder;
    }(view));

  return (blobParts, options) => {
    let type = options ? (options.type || '') : '';
    let builder = new BlobBuilder();
    if (blobParts) {
      for (let i = 0, len = blobParts.length; i < len; i++) {
        builder.append(blobParts[i]);
      }
    }
    return builder.getBlob(type);
  };
}(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content || this));
