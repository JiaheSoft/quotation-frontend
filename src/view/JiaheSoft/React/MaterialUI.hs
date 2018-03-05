{-# LANGUAGE OverloadedStrings #-}

{-|
/ Generated for material-ui-v1.0.0-beta.35 /

Wraps [material-ui](https://material-ui-next.com/), a javascript library that provides Material style
React components. Note that you need to link to the UMD file of 'material-ui'
in your HTML.

For each combinator in this module, the first parameter is the properties,
and the second parameter is the children.
-}
module JiaheSoft.React.MaterialUI
  ( appBar_
  , avatar_
  , badge_
  , bottomNavigation_
  , button_
  , buttonBase_
  , card_
  , checkbox_
  , chip_
  , dialog_
  , dialogTitle_
  , divider_
  , drawer_
  , expansionPanel_
  , form_
  , grid_
  , gridList_
  , hidden_
  , icon_
  , iconButton_
  , input_
  , inputLabel_
  , list_
  , menu_
  , mobileStepper_
  , modal_
  , paper_
  , popover_
  , portal_
  , progress_
  , radio_
  , reboot_
  , select_
  , snackbar_
  , stepper_
  , svgIcon_
  , switch_
  , table_
  , tabs_
  , textField_
  , toolbar_
  , tooltip_
  , typography_
  ) where

import           GHCJS.Types (JSString, JSVal)
import           React.Flux  (PropertyOrHandler, ReactElementM, foreignClass)

foreign import javascript unsafe
  "$r = window['material-ui'][$1]"
  jsMuiClass :: JSString -> JSVal

muiClass :: JSString
         -> [PropertyOrHandler handler]
         -> ReactElementM handler ()
         -> ReactElementM handler ()
muiClass className props children =
  foreignClass (jsMuiClass className) props children

appBar_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
appBar_ = muiClass "AppBar"

avatar_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
avatar_ = muiClass "Avatar"

badge_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
badge_ = muiClass "Badge"

bottomNavigation_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
bottomNavigation_ = muiClass "BottomNavigation"

button_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
button_ = muiClass "Button"

buttonBase_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
buttonBase_ = muiClass "ButtonBase"

card_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
card_ = muiClass "Card"

checkbox_ :: [PropertyOrHandler handler] -> ReactElementM handler ()
checkbox_ props = muiClass "Checkbox" props mempty

chip_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
chip_ = muiClass "Chip"

dialog_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
dialog_ = muiClass "Dialog"

dialogTitle_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
dialogTitle_ = muiClass "DialogTitle"

divider_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
divider_ = muiClass "Divider"

drawer_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
drawer_ = muiClass "Drawer"

expansionPanel_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
expansionPanel_ = muiClass "ExpansionPanel"

form_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
form_ = muiClass "Form"

grid_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
grid_ = muiClass "Grid"

gridList_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
gridList_ = muiClass "GridList"

hidden_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
hidden_ = muiClass "Hidden"

icon_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
icon_ = muiClass "Icon"

iconButton_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
iconButton_ = muiClass "IconButton"

input_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
input_ = muiClass "Input"

inputLabel_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
inputLabel_ = muiClass "InputLabel"

list_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
list_ = muiClass "List"

menu_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
menu_ = muiClass "Menu"

mobileStepper_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
mobileStepper_ = muiClass "MobileStepper"

modal_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
modal_ = muiClass "Modal"

paper_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
paper_ = muiClass "Paper"

popover_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
popover_ = muiClass "Popover"

portal_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
portal_ = muiClass "Portal"

progress_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
progress_ = muiClass "Progress"

radio_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
radio_ = muiClass "Radio"

reboot_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
reboot_ = muiClass "Reboot"

select_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
select_ = muiClass "Select"

snackbar_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
snackbar_ = muiClass "Snackbar"

stepper_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
stepper_ = muiClass "Stepper"

svgIcon_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
svgIcon_ = muiClass "SvgIcon"

switch_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
switch_ = muiClass "Switch"

table_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
table_ = muiClass "Table"

tabs_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
tabs_ = muiClass "Tabs"

textField_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
textField_ = muiClass "TextField"

toolbar_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
toolbar_ = muiClass "Toolbar"

tooltip_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
tooltip_ = muiClass "Tooltip"

typography_ :: [PropertyOrHandler handler] -> ReactElementM handler () -> ReactElementM handler ()
typography_ = muiClass "Typography"

