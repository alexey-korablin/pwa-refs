# pwa-refs

Android emulator's localhost ip address: 10.0.2.2

Enabling install banner on mobiles

- open in new tab chrome://inspect/#devices
  Check the Devices menu option on the left is active
  If the port forwarding between host machine and mobile emulator wasn't configured then click "Port forwarding..." button.
  In pop-up window the first input field requires get the port of mobile emulator, the second one requires get the address or alias and port of host machine. F.e. localhost:5500
  "Enable port forwarding" checkbox should be ticked
  If everything is okay click "Done" button
- open the mobile emulator
  Open Google Chrome browser. In address bar type localhost:5500.
  After the site will be loaded the "Add <this app> to Home screen" banner will be appeared on the bootom of device's screen
