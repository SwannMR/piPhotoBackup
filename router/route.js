module.exports = function(app)

{
  const Rsync =  require('rsync');
  const fs = require('fs');

  app.get('/', (req, res) => {
    data = {}
    const folder = '/home/michael/Work/nodejs/piPhotoBackup/test';
    fs.readdir(folder, (err, files) => {
      console.log(files.length);
      data.filecount = files.length;
    });
    res.render('index', {rsync: data});
  })

  app.post('/', (req, res) => {
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
    linuxCommand('ls -l')
    res.redirect('/');
  })
}

const exec = require('child_process').exec;

function linuxCommand(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if(error) {
      console.log(`exec error ${error}`);
      return;
    }
    console.log(stdout);
    return stdout;
  });
}
