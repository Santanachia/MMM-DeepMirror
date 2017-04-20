# MagicMirrorModule-DeepMirror

[MagicMirror² Project on Github](https://github.com/MichMich/MagicMirror)

<img src="https://raw.githubusercontent.com/Santanachia/MMM-DeepMirror/master/screen.png" />

## Usage 

To use this module, go to the *modules* subfolder of your mirror and clone this repository. 

### Configuration

To run the module, you need to add the following data to your config.js file.

```
{
  module: 'MMM-DeepMirror',
  position: 'fullscreen_below'
}
```

You may want to set the following options in the config section as well:

| Option |  Description |
|---|---|
| `spacing` | Spacing between dots. (Pixels)<br><br>**Default value:** `60` |
| `depth` | Number of dotted lines<br><br>**Default value:** `6` |
| `size` | Size of dots in first line (Pixels)<br><br>**Default value:** `5` |
