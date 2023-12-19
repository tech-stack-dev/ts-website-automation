import jsonStringifySafe from 'json-stringify-safe';
export default function mixinStringifySafe(data) {
  return Object.defineProperty(data, 'stringifySafe', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function () {
      let serializer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return jsonStringifySafe(this, serializer, indent, (key, value) => {
        return {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: value.sys.id,
            circular: true
          }
        };
      });
    }
  });
}