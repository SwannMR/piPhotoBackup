module.exports = function(app)

{
  const Rsync =  require('rsync');

  app.get('/', (req, res) => {
    res.render('index');
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

}
