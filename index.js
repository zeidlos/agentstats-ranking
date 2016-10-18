

const _ = require('lodash');
const curl = require('curlrequest');

const config = require('./config.json');
// In order to not put too much stress on the agent stats server while developing,
// use a preloaded file instead of live data.
// curl -H 'AS-Key: XXXX' 'https://api.agent-stats.com/groups/groupID/week' -o weekly.json
// const weekly = require('./weekly.json');

const getData = (config) => {
  curl.request({
    'url': config.URL,
    'headers': {'AS-Key' : config.API_KEY},
  }, function (err, stdout, meta) {
    if(meta) {
      // console.log(meta);
    }
    if(err) {
      console.log(err);
    }
    if(stdout) {
      console.log('Download success ...');
      initData(JSON.parse(stdout));
    }
  });
}

getData(config);

const createArray = (obj) => {
  let tmp = [];
  for (var entry in obj) {
    if (obj.hasOwnProperty(entry)) {
      obj[entry].name = entry;
      obj[entry].points = 0;
      tmp.push(obj[entry]);
      tmp.last
    }
  }

  return tmp;
}

const initData = (weekly) => {
  console.log('Initializing project data.');
  const weeklyArray = createArray(weekly);

  const level1to9 = _.filter(weeklyArray, {
    'level': 1,
    'level': 2,
    'level': 3,
    'level': 4,
    'level': 5,
    'level': 6,
    'level': 7,
    'level': 8,
    'level': 9,
  });

  const level10to13 = _.filter(weeklyArray, {
    'level': 10,
    'level': 11,
    'level': 12,
    'level': 13,
  });

  const level14to16 = _.filter(weeklyArray, {
    'level': 14,
    'level': 15,
    'level': 16,
  });

  const getBestN = (arr, type, order, number) => {
    if(!number) { number = 10};
    var tmp = _.orderBy(arr, type, order);
    return _.take(tmp, number);
  }

  const mostPoints = {
    'name': 'mostPoints',
    '1to9':   getBestN(level1to9, 'points', 'desc'),
    '10to13': getBestN(level10to13, 'points', 'desc'),
    '14to16': getBestN(level14to16, 'points', 'desc'),
    'all':    getBestN(weekly, 'points', 'desc'),
  }

  const mostAp = {
    'name':   'mostAp',
    '1to9':   getBestN(level1to9, 'ap', 'desc'),
    '10to13': getBestN(level10to13, 'ap', 'desc'),
    '14to16': getBestN(level14to16, 'ap', 'desc'),
    'all':    getBestN(weekly, 'ap', 'desc'),
  }
  const mostExplorer = {
    'name':   'mostExplorer',
    '1to9':   getBestN(level1to9, 'explorer', 'desc'),
    '10to13': getBestN(level10to13, 'explorer', 'desc'),
    '14to16': getBestN(level14to16, 'explorer', 'desc'),
    'all':    getBestN(weekly, 'explorer', 'desc'),
  }
  const mostSeer = {
    'name':   'mostSeer',
    '1to9':   getBestN(level1to9, 'seer', 'desc'),
    '10to13': getBestN(level10to13, 'seer', 'desc'),
    '14to16': getBestN(level14to16, 'seer', 'desc'),
    'all':    getBestN(weekly, 'seer', 'desc'),
  }
  const mostCollector = {
    'name':   'mostCollector',
    '1to9':   getBestN(level1to9, 'collector', 'desc'),
    '10to13': getBestN(level10to13, 'collector', 'desc'),
    '14to16': getBestN(level14to16, 'collector', 'desc'),
    'all':    getBestN(weekly, 'collector', 'desc'),
  }
  const mostHacker = {
    'name':   'mostHacker',
    '1to9':   getBestN(level1to9, 'hacker', 'desc'),
    '10to13': getBestN(level10to13, 'hacker', 'desc'),
    '14to16': getBestN(level14to16, 'hacker', 'desc'),
    'all':    getBestN(weekly, 'hacker', 'desc'),
  }
  const mostBuilder = {
    'name':   'mostBuilder',
    '1to9':   getBestN(level1to9, 'builder', 'desc'),
    '10to13': getBestN(level10to13, 'builder', 'desc'),
    '14to16': getBestN(level14to16, 'builder', 'desc'),
    'all':    getBestN(weekly, 'builder', 'desc'),
  }
  const mostConnector = {
    'name':   'mostConnector',
    '1to9':   getBestN(level1to9, 'connector', 'desc'),
    '10to13': getBestN(level10to13, 'connector', 'desc'),
    '14to16': getBestN(level14to16, 'connector', 'desc'),
    'all':    getBestN(weekly, 'connector', 'desc'),
  }
  const mostMindController = {
    'name':   'mostMindController',
    '1to9':   getBestN(level1to9, 'mind-controller', 'desc'),
    '0to13':  getBestN(level10to13, 'mind-controller', 'desc'),
    '14to16': getBestN(level14to16, 'mind-controller', 'desc'),
    'all':    getBestN(weekly, 'mind-controller', 'desc'),
  }
  const mostIlluminator = {
    'name':   'mostIlluminator',
    '1to9':   getBestN(level1to9, 'illuminator', 'desc'),
    '10to13': getBestN(level10to13, 'illuminator', 'desc'),
    '14to16': getBestN(level14to16, 'illuminator', 'desc'),
    'all':    getBestN(weekly, 'illuminator', 'desc'),
  }
  const mostBinder = {
    'name':   'mostBinder',
    '1to9':   getBestN(level1to9, 'binder', 'desc'),
    '10to13': getBestN(level10to13, 'binder', 'desc'),
    '14to16': getBestN(level14to16, 'binder', 'desc'),
    'all':    getBestN(weekly, 'binder', 'desc'),
  }
  const mostCountryMaster = {
    'name':   'mostCountryMaster',
    '1to9':   getBestN(level1to9, "'country-master'", 'desc'),
    '0to13':  getBestN(level10to13, "'country-master'", 'desc'),
    '14to16': getBestN(level14to16, "'country-master'", 'desc'),
    'all':    getBestN(weekly, "'country-master'", 'desc'),
  }
  const mostRecharger = {
    'name':   'mostRecharger',
    '1to9':   getBestN(level1to9, 'recharger', 'desc'),
    '10to13': getBestN(level10to13, 'recharger', 'desc'),
    '14to16': getBestN(level14to16, 'recharger', 'desc'),
    'all':    getBestN(weekly, 'recharger', 'desc'),
  }
  const mostLiberator = {
    'name':   'mostLiberator',
    '1to9':   getBestN(level1to9, 'liberator', 'desc'),
    '10to13': getBestN(level10to13, 'liberator', 'desc'),
    '14to16': getBestN(level14to16, 'liberator', 'desc'),
    'all':    getBestN(weekly, 'liberator', 'desc'),
  }
  const mostPioneer = {
    'name':   'mostPioneer',
    '1to9':   getBestN(level1to9, 'pioneer', 'desc'),
    '10to13': getBestN(level10to13, 'pioneer', 'desc'),
    '14to16': getBestN(level14to16, 'pioneer', 'desc'),
    'all':    getBestN(weekly, 'pioneer', 'desc'),
  }
  const mostPurifier = {
    'name':   'mostPurifier',
    '1to9':   getBestN(level1to9, 'purifier', 'desc'),
    '10to13': getBestN(level10to13, 'purifier', 'desc'),
    '14to16': getBestN(level14to16, 'purifier', 'desc'),
    'all':    getBestN(weekly, 'purifier', 'desc'),
  }
  const mostNeutralizer = {
    'name':   'mostNeutralizer',
    '1to9':   getBestN(level1to9, 'neutralizer', 'desc'),
    '10to13': getBestN(level10to13, 'neutralizer', 'desc'),
    '14to16': getBestN(level14to16, 'neutralizer', 'desc'),
    'all':    getBestN(weekly, 'neutralizer', 'desc'),
  }
  const mostDisruptor = {
    'name':   'mostDisruptor',
    '1to9':   getBestN(level1to9, 'disruptor', 'desc'),
    '10to13': getBestN(level10to13, 'disruptor', 'desc'),
    '14to16': getBestN(level14to16, 'disruptor', 'desc'),
    'all':    getBestN(weekly, 'disruptor', 'desc'),
  }
  const mostSalvator = {
    'name':   'mostSalvator',
    '1to9':   getBestN(level1to9, 'salvator', 'desc'),
    '10to13': getBestN(level10to13, 'salvator', 'desc'),
    '14to16': getBestN(level14to16, 'salvator', 'desc'),
    'all':    getBestN(weekly, 'salvator', 'desc'),
  }
  const mostTrekker = {
    'name':   'mostTrekker',
    '1to9':   getBestN(level1to9, 'trekker', 'desc'),
    '10to13': getBestN(level10to13, 'trekker', 'desc'),
    '14to16': getBestN(level14to16, 'trekker', 'desc'),
    'all':    getBestN(weekly, 'trekker', 'desc'),
  }
  const mostGuardian = {
    'name':   'mostGuardian',
    '1to9':   getBestN(level1to9, 'guardian', 'desc'),
    '10to13': getBestN(level10to13, 'guardian', 'desc'),
    '14to16': getBestN(level14to16, 'guardian', 'desc'),
    'all':    getBestN(weekly, 'guardian', 'desc'),
  }
  const mostSmuggler = {
    'name':   'mostSmuggler',
    '1to9':   getBestN(level1to9, 'smuggler', 'desc'),
    '10to13': getBestN(level10to13, 'smuggler', 'desc'),
    '14to16': getBestN(level14to16, 'smuggler', 'desc'),
    'all':    getBestN(weekly, 'smuggler', 'desc'),
  }
  const mostLinkMaster = {
    'name':   'mostLinkMaster',
    '1to9':   getBestN(level1to9, 'link-master', 'desc'),
    '0to13':  getBestN(level10to13, 'link-master', 'desc'),
    '14to16': getBestN(level14to16, 'link-master', 'desc'),
    'all':    getBestN(weekly, 'link-master', 'desc'),
  }
  const mostController = {
    'name':   'mostController',
    '1to9':   getBestN(level1to9, 'controller', 'desc'),
    '10to13': getBestN(level10to13, 'controller', 'desc'),
    '14to16': getBestN(level14to16, 'controller', 'desc'),
    'all':    getBestN(weekly, 'controller', 'desc'),
  }
  const mostFieldMaster = {
    'name':   'mostFieldMaster',
    '1to9':   getBestN(level1to9, 'field-master', 'desc'),
    '0to13':  getBestN(level10to13, 'field-master', 'desc'),
    '14to16': getBestN(level14to16, 'field-master', 'desc'),
    'all':    getBestN(weekly, 'field-master', 'desc'),
  }
  const mostSpecops = {
    'name':   'mostSpecops',
    '1to9':   getBestN(level1to9, 'specops', 'desc'),
    '10to13': getBestN(level10to13, 'specops', 'desc'),
    '14to16': getBestN(level14to16, 'specops', 'desc'),
    'all':    getBestN(weekly, 'specops', 'desc'),
  }
  const mostEngineer = {
    'name':   'mostEngineer',
    '1to9':   getBestN(level1to9, 'engineer', 'desc'),
    '10to13': getBestN(level10to13, 'engineer', 'desc'),
    '14to16': getBestN(level14to16, 'engineer', 'desc'),
    'all':    getBestN(weekly, 'engineer', 'desc'),
  }
  const mostSojourner = {
    'name':   'mostSojourner',
    '1to9':   getBestN(level1to9, 'sojourner', 'desc'),
    '10to13': getBestN(level10to13, 'sojourner', 'desc'),
    '14to16': getBestN(level14to16, 'sojourner', 'desc'),
    'all':    getBestN(weekly, 'sojourner', 'desc'),
  }
  const mostRecruiter = {
    'name':   'mostRecruiter',
    '1to9':   getBestN(level1to9, 'recruiter', 'desc'),
    '10to13': getBestN(level10to13, 'recruiter', 'desc'),
    '14to16': getBestN(level14to16, 'recruiter', 'desc'),
    'all':    getBestN(weekly, 'recruiter', 'desc'),
  }
  const mostTranslator = {
    'name':   'mostTranslator',
    '1to9':   getBestN(level1to9, 'translator', 'desc'),
    '10to13': getBestN(level10to13, 'translator', 'desc'),
    '14to16': getBestN(level14to16, 'translator', 'desc'),
    'all':    getBestN(weekly, 'translator', 'desc'),
  }

  const generateOutput = (type, group, show) => {
    console.log('********** ' + type.name + ' for ' + group + ' showing ' + show + '. **************');
    for (var i = 0; i < type[group].length; i++) {
      if(type[group][i][show] && group !== 'all') {
        type[group][i].points += (10-i);
        // console.log(type[group][i].points);
      }
      console.log(type[group][i].name, type[group][i][show]);
    }
    console.log(' ');
  }

  const showScores = (group) => {
    for (var i = 0; i < type[group].length; i++) {
        console.log(type[group][i].points);
    }
  }

  // generateOutput(mostAp, '1to9', 'ap');

  const showAllForType = (type, show) => {
    generateOutput(type, '1to9', show);
    generateOutput(type, '10to13', show);
    generateOutput(type, '14to16', show);
    generateOutput(type, 'all', show);
  }

  showAllForType(mostExplorer, 'explorer');
  showAllForType(mostTrekker, 'trekker');
  showAllForType(mostBuilder, 'builder');
  showAllForType(mostConnector, 'connector');
  // showAllForType(mostMindController, 'mind-controller');
  showAllForType(mostIlluminator, 'illuminator');
  showAllForType(mostRecharger, 'recharger');
  showAllForType(mostLiberator, 'liberator');
  showAllForType(mostPioneer, 'pioneer');
  showAllForType(mostEngineer, 'engineer');
  showAllForType(mostPurifier, 'purifier');
  showAllForType(mostSpecops, 'specops');
  showAllForType(mostHacker, 'hacker');
  showAllForType(mostTranslator, 'translator');

  showAllForType(mostPoints, 'points');

  // console.log(generateOutput(mostMindController, '14to16', 'mind-controller'));

  // showScores('all');

}

// Inits the data from local file in filesystem. DEV only.
// initData(weekly);
