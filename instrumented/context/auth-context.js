function cov_2p48y2zsb6() {
  var path = "C:\\Users\\akiku\\OneDrive\\Ty\xF6p\xF6yt\xE4\\Web-sovelluskehitys\\studentin\\client\\src\\context\\auth-context.js";
  var hash = "c2a8e608ab929e29f57040c0d80f48aee6588e69";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\akiku\\OneDrive\\Ty\xF6p\xF6yt\xE4\\Web-sovelluskehitys\\studentin\\client\\src\\context\\auth-context.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 20
        },
        end: {
          line: 9,
          column: 2
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 7,
            column: 9
          },
          end: {
            line: 7,
            column: 10
          }
        },
        loc: {
          start: {
            line: 7,
            column: 15
          },
          end: {
            line: 7,
            column: 17
          }
        },
        line: 7
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 8,
            column: 10
          },
          end: {
            line: 8,
            column: 11
          }
        },
        loc: {
          start: {
            line: 8,
            column: 16
          },
          end: {
            line: 8,
            column: 18
          }
        },
        line: 8
      }
    },
    branchMap: {},
    s: {
      "0": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c2a8e608ab929e29f57040c0d80f48aee6588e69"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2p48y2zsb6 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2p48y2zsb6();
import { createContext } from 'react';
const AuthContext = (cov_2p48y2zsb6().s[0]++, createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {
    cov_2p48y2zsb6().f[0]++;
  },
  logout: () => {
    cov_2p48y2zsb6().f[1]++;
  }
}));
export default AuthContext;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgtY29udGV4dC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwiQXV0aENvbnRleHQiLCJpc0xvZ2dlZEluIiwidG9rZW4iLCJ1c2VySWQiLCJsb2dpbiIsImxvZ291dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsYUFBVCxRQUE4QixPQUE5QjtBQUVBLE1BQU1DLFdBQVcsNkJBQUdELGFBQWEsQ0FBQztBQUNoQ0UsRUFBQUEsVUFBVSxFQUFFLEtBRG9CO0FBRWhDQyxFQUFBQSxLQUFLLEVBQUUsSUFGeUI7QUFHaENDLEVBQUFBLE1BQU0sRUFBRSxJQUh3QjtBQUloQ0MsRUFBQUEsS0FBSyxFQUFFLE1BQU07QUFBQTtBQUFFLEdBSmlCO0FBS2hDQyxFQUFBQSxNQUFNLEVBQUUsTUFBTTtBQUFBO0FBQUU7QUFMZ0IsQ0FBRCxDQUFoQixDQUFqQjtBQU9BLGVBQWVMLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgdG9rZW46IG51bGwsXG4gIHVzZXJJZDogbnVsbCxcbiAgbG9naW46ICgpID0+IHt9LFxuICBsb2dvdXQ6ICgpID0+IHt9LFxufSk7XG5leHBvcnQgZGVmYXVsdCBBdXRoQ29udGV4dDtcbiJdfQ==