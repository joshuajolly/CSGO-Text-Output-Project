http = require('http');
fs = require('fs');
exec = require('child_process').exec;

port = 3000;
host = '127.0.0.1';

//importing custom data
var phrases = fs.readFileSync(__dirname.replace('Server','') + 
	'\\Data\\Custom Phrases\\Phrases.txt').toString().split("\n");
var dirName = fs.readFileSync(__dirname.replace('Server','') + 
	'\\Data\\Steam Directory\\Directory Name.txt').toString().replace('\\','\\\\');
var gamestate = fs.readFileSync(__dirname.replace('Server','') + 
	'\\Data\\Gamestate Cfg\\gamestate_integration_server.cfg').toString();
	
//checking if the gamestate integration is an enabled .cfg
if (fs.existsSync(dirName.concat('\\cfg\\gamestate_integration_server.cfg'))) {
	console.log('Our .cfg file exists!');
} else {
	console.log('\nLooks like this might be your first time using gamestate integration. If so, please restart CSGO. If not, ignore this message.');
	fs.writeFile(dirName.concat('\\cfg\\gamestate_integration_server.cfg'), gamestate);
}

//creating a new .cfg file to put our commands in
if (fs.existsSync(dirName.concat('\\cfg\\button.cfg'))) {
	fs.unlink(dirName.concat('\\cfg\\button.cfg'));
}
fs.writeFile(dirName.concat('\\cfg\\button.cfg'), 'clear');

server = http.createServer( function(req, res) {

	if (req.method == 'POST') {
		res.writeHead(200, {'Content-Type': 'text/html'});

		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function() {
			update(JSON.parse(body));
			res.end('');
		});

	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
		res.end(html);
	}

});

phase = ''
headshots = 0
kills = 0
round = 0

function update(json) {

	try {
		if ("warmup" !== json.round.phase && "freezetime" !== json.round.phase) {
			if (kills !== json.player.state.round_kills) {
				if (json.player.state.round_kills !== 0 && json.player.state.round_kills < 6 && phrases[kills].length !== 0) {
					console.log('Phase: ' + json.round.phase);
					console.log('Output: ' + phrases[kills]);
					console.log('Kills: ' + json.player.state.round_kills);
					fs.writeFile(dirName.concat('\\cfg\\button.cfg'), 'say ' + phrases[kills]);
					var start = exec('createkeypress.bat FOO', function( error, stdout, stderr) {
						if ( error != null ) {
							console.log(stderr);
						}
					});
				}
				kills = json.player.state.round_kills;
			}
		}
	} catch(err) {
	}

}

server.listen(port, host);
console.log('\nListening at http://' + host + ':' + port + "\n");