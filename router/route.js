'use strict';

module.exports = function(app)

{
  const Rsync =  require('rsync');

  app.get('/', (req, res) => {
    let data = {}
    const folder = '/mnt/external-1';
    linuxCommand('find /mnt/external-1/ -type f | wc -l')
      .then(stdout => {
         console.log(stdout);
         data.filecount = stdout;
         return res.render('index', {rsync: data});
      })
      .catch(err => {
        console.log(err)
        data.filecount = 'error';
        return res.render('index', {rsync: data});
      })
  })

  app.post('/sync', (req, res) => {
    console.log(req.body);
    let source = req.body.source;
    let destination = req.body.destination;
    let rsync = new Rsync()
      .flags('az')
      .source(source)
      .destination(destination);
    console.log('execute rsync');
    rsync.execute(function(error, code, cmd) {
      if (error) {
        console.log('Error');
        console.log(error);
      }
      console.log('finished');
    });
    res.redirect('/');
  })

  app.post('/shutdown', (req, res) => {
    console.log('shutting down');
    linuxCommand('sudo halt')
    res.redirect('/');
  })
}

const Promise = require('promise')
const exec = require('child_process').exec;

function linuxCommand(cmd) {
  return new Promise((resolve, reject) => {

    exec(cmd, (error, stdout, stderr) => {
      if(error) {
        console.log(`exec error ${error}`);
        return reject('error');
      }
      return resolve(stdout);
    });
  });
}
