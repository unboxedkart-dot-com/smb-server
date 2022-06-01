const newProductSpecs = this.productSpecsModel.insertMany([
  {
    "productCode": 'apple-iphone-8',
    "productSpecs": [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 8',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Single Sim',
          "Touchscreen": 'Yes',
          'Sound Enhancements': 'Built-in Stereo Speaker, Built-in Microphone',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.20, Body: 1.13',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '11.94 cm (4.7 inch)',
          "Resolution": '1334 x 750 Pixels',
          'Resolution Type': 'Retina HD Display',
          'Display Type':
            'Widescreen LCD Multi-touch Display with IPS Technology',
          'Other Display Features':
            '1400:1 Contrast Ratio (Typical), True Tone Display, Wide Color Display (P3), 3D Touch, 625 cd/m2 Max Brightness (Typical), Dual-domain Pixels for Wide Viewing Angles, Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously, Display Zoom, Reachability',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 12',
          'Processor Type':
            'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor',
          'Operating Frequency':
            '4G FDD-LTE (Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 29, 30, 66)',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP Rear Camera',
          'Primary Camera Features':
            'f/1.8 Aperture, Optical Image Stabilization, Six Element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Live Photos with Stabilization, Wide Color Capture for Photos and Live Photos, Improved Local Tone Mapping, Body and Face Detection, Exposure Control, Noise Reduction, Auto HDR for Photos, Auto Image Stabilization, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF And JPEG',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '7MP Front Camera',
          'Secondary Camera Features':
            '1080p HD Video Recording, f/2.2 Aperture, Wide Color Capture for Photos and Live Photos, Auto HDR, Backside Illumination Sensor, Body and Face Detection, Auto Image Stabilization, Burst Mode, Exposure Control, Timer Mode',
          "Flash":
            'Rear Quad LED True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution': '3840 x 2160 Pixels',
          'Digital Zoom': 'Digital Zoom Upto 5x',
          'Frame Rate':
            '4K Video Recording At 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording At 30 fps, Slo-Mo Video Support for 1080P at 120 fps or 240 fps fps',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '3G, 4G, 2G',
          'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11 ac (Wi-Fi with MIMO)',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other details',
        'values': {
          "Smartphone": 'Yes',
          'SIM Size': 'Nano SIM',
          "SMS": 'Yes',
          'Graphics PPI': '326 PPI',
          'Predictive Text Input': 'Yes',
          "Sensors":
            'Touch ID Fingerprint Sensor Built into the Home Button, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi-language Support',
          'Other Features':
            'Apple ID (Required for Some Features) - Syncing with iTunes on a Mac or PC Requires: Mac - OS X 10.9.5 or Later, PC - Windows 7 or Later, iTunes 12.7 or Later, Rating for Hearing Aids: M3, NFC with Reader Mode, Accessibility: VoiceOver, Siri and Dictation, AssistiveTouch, Zoom, Type to Siri, Speak Screen, Magnifier, Switch Control, Software TTY, Closed Captions, System Requirements, Video Recording: 4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Optical Image Stabilization for Video, Optical Zoom: 6x Digital Zoom (iphone 8 Plus Only), Quad LED True Tone Flash, Slo-Mo Video Support for 1080P at 120 fps or 240 fps, Time-lapse Video with Stabilization, Cinematic Video Stabilization (1080P and 720P), Continuous Autofocus Video, Body and Face Detection, Noise Reduction, Take 8MP Still Photos while Recording 4K Video, Playback Zoom, Video Geotagging, Video Formats Recorded: HEVC and H.264, Apple Pay, Location: Digital Compass, Wi-Fi, Cellular, iBeacon Microlocation, Lightning Connector',
          'Important Apps':
            'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, News, Contacts, iBooks, Home, Weather, Reminders, Clock, TV, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, iCloud Drive, Find My iPhone, Find My Friends, Settings, Files',
          'GPS Type': 'Assisted GPS, GLONASS, Galileo, QZSS',
          'Multimedia Features': 'Audio Formats',
          'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3), Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)':
            'Video Formats',
          'HEVC, H.264, MPEG-4 Part 2, Motion JPEG Supports Dolby Vision and HDR10 Content':
            'Dimensions',
          "Width": '67.3 mm',
          "Height": '138.4 mm',
          "Depth": '7.3 mm',
          "Weight": '148 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-x',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone X',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Single Sim',
          "Touchscreen": 'Yes',
          'Sound Enhancements': 'Built-in Stereo Speaker, Built-in Microphone',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.09, Body: 1.17',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '14.73 cm (5.8 inch)',
          Resolution: '2436 x 1125 Pixels',
          'Resolution Type': 'Super Retina HD Display',
          'Display Type': 'All-screen OLED Multi-touch Display',
          'Other Display Features':
            'HDR Display, 1,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Color Display (P3), 3D Touch, 625 cd/m2 Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 11',
          'Processor Type':
            'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Wide-angle and Telephoto Cameras, Wide-angle: f/1.8 Aperture, Telephoto: f/2.4 Aperture, Portrait Mode, Portrait Lighting (Beta), Dual Optical Image Stabilization, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Live Photos with Stabilization, Wide Color Capture for Photos and Live Photos, Improved local Tone Mapping, Body and Face Detection, Exposure Control, Noise Reduction, Auto HDR for Photos, Auto Image Stabilization, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '7MP Front Camera',
          'Secondary Camera Features':
            'Portrait Mode, Portrait Lighting (Beta), Animoji, 1080p HD Video Recording, f/2.2 Aperture, Wide Color Capture for Photos and Live Photos, Auto HDR, Backside Illumination Sensor, Body and Face Detection, Auto Image Stabilization, Burst Mode, Exposure Control, Timer Mode',
          Flash:
            'Rear Quad LED True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution': '3840 x 2160 Pixels',
          'Digital Zoom': 'Digital Zoom Upto 10x',
          'Frame Rate':
            '4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Slo-Mo Video Support for 1080P at 120 fps or 240 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '3G, 4G, 2G',
          'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11 ac (Wi-Fi with MIMO)',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM',
          SMS: 'Yes',
          'Graphics PPI': '458 PPI',
          'Predictive Text Input': 'Yes',
          Sensors:
            'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi-language Support',
          'Other Features':
            'Video Recording: 4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Optical Image Stabilization for Video, Optical Zoom: 6x Digital Zoom, Quad LED True Tone Flash, Slo-Mo Video Support for 1080P at 120 fps or 240 fps, Time-lapse Video with Stabilization, Cinematic Video Stabilization (1080P and 720P), Continuous Autofocus Video, Body and Face Detection, Noise Reduction, Take 8MP Still Photos while Recording 4K Video, Playback Zoom, Video Geotagging, Video Formats Recorded: HEVC and H.264, Face ID: Enabled by TrueDepth Camera for Facial Recognition, Apple Pay, NFC with Reader Mode, Location: Digital Compass, Wi-Fi, Cellular, iBeacon Microlocation, Accessibility: VoiceOver, Zoom, Magnifier, Software TTY, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids: iPhone X (Model A1865, A1901): M3, T4, System Requirements - Apple ID (Required for Some Features), Syncing with iTunes on a Mac or PC Requires - Mac: OS X 10.10.5 or Later, PC: Windows 7 or Later, iTunes 12.7 or Later',
          'Important Apps':
            'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Siri, Calendar, iTunes Store, App Store, Notes, News, Contacts, iBooks, Home, Weather, Reminders, Clock, TV, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Files',
          'GPS Type': 'Assisted GPS, GLONASS, Galileo, QZSS',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3), Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)',
          'Video Formats':
            'HEVC, H.264, MPEG-4 Part 2, Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '70.9 mm',
          Height: '143.6 mm',
          Depth: '7.7 mm',
          Weight: '174 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-xs',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone XS',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Sound Enhancements':
            '2 x Built-in Stereo Speaker, 2 x Built-in Microphone',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.19, Body: 1.18',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '14.73 cm (5.8 inch)',
          Resolution: '2436 x 1125 pixels',
          'Resolution Type': 'Super Retina HD Display',
          GPU: '4-core, Graphics Performance - Upto 50% Faster than A11 Bionic, Metal 2 Optimised, 3D, Graphics-intensive Gameplay, Faster and More Fluid',
          'Display Type': 'All-screen OLED Multi-touch Display',
          'HD Game Support': 'Yes',
          'Other Display Features':
            'HDR Display, 1000000:1 Contrast Ratio (Typical), True Tone Display (Six-channel Light Sensor), Wide Color Display (P3), 3D Touch, 625 nits Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 12',
          'Processor Type': 'A12 Bionic Chip',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Wide-angle and Telephoto Cameras, Wide-angle Lens: f/1.8 Aperture, Telephoto: f/2.4 Aperture, 2x Optical Zoom, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Dual Optical Image Stabilisation, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Smart HDR for Photos, Wide Color Capture for Photos and Live Photos, Local Tone Mapping, Advanced Red-eye Correction, Exposure Control, Auto Image Stabilisation, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Rear Camera AR, More Low-light Detail, Sharper Action Shots, 4K Video and Wider Stereo Playback, Face Detection, Facial Landmarking, Depth Mapping, Portrait Lighting, 4K Video Upto 60 fps',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '7MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera, Wide-angle Lens - f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Animoji and Memoji, Smart HDR for Photos, All-new Video Stabilisation, Cinematic Video Stabilisation (1080p and 720p), Wide Color Capture for Photos and Live Photos, Backside Illumination Sensor, Auto Image Stabilisation, Burst Mode, Exposure Control, Timer Mode, Front Camera AR, Enhanced Portrait Mode Selfies, 1080p HD Video Upto 60 fps',
          Flash:
            'Rear Quad-LED True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution': '2160p',
          'Digital Zoom': 'Digital Zoom Upto 10x',
          'Frame Rate':
            'Front Camera - 1080p HD Video Recording at 30 fps or 60 fps, Extended Dynamic Range for Video at 30 fps, 4K Video Upto 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Video Call Support': 'Yes',
          'Phone Book': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '3G, 4G, 2G',
          'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11ac with 2x2 MIMO',
          NFC: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM and eSIM',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '458 PPI',
          'Predictive Text Input': 'Yes',
          Sensors:
            'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi Languages Support',
          Games: 'Yes',
          'Other Features':
            'Chip - Next-generation Neural Engine, Rated IP68 - Splash, Water and Dust Resistant, Face ID - Enabled by TrueDepth Camera for Facial Recognition, Log-in to Your Apps and Accounts, Adaptive Recognition, Unlock in an Instant, Dot Projector (Unique Facial Map More than 30000 Invisible Dots), Infrared Camera, Flood Illuminator, NFC with Reader Mode, Express Cards with Power Reserve, Location - Digital Compass, Wi-Fi, Cellular, iBeacon micro-location, Audio Playback - Wider Stereo Playback, User-configurable Maximum Volume Limit, Video Playback - High Dynamic Range with Dolby Vision and HDR10 Content, External Buttons and Connectors - Volume Up / Down, Ring / Silent, Side Button, Lightning Connector, Charging via USB to Computer System or Power Adapter, Accessibility - VoiceOver, Zoom, Magnifier, RTT and TTY Support, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids - M3, T4, Multi Languages Support - QuickType Keyboard Support, QuickType Keyboard Support with Predictive Input, Siri, Dictation, Definition Dictionary Support, Thesaurus, Bilingual Dictionary Support with English, Spellcheck, No Home Button, Apple-designed CPU - 2 Performance Cores Upto 15% Faster than A11 Bionic, 4 Efficiency Cores Upto 50% Lower Power Usage than A11 Bionic, Apple-designed Neural Engine - 8-core Architecture, 5 Trillion Operations Per Second, Core ML Runs Upto 9x Faster than A11 Bionic, Enhanced ISP, End-to-end Encryption, Ongoing Security Updates, Limited Advertisers Tracking, Powered by Renewable Energy, Control iPhone with a Switch, Listen While You Read or Type, Easier-to-read Type, Privacy in Apps, iCloud, Copy and Paste between Devices ,Faster Wireless Charging, 4G LTE Advanced, Water Resistant to 2 Metres for up to 30 minutes',
          'Important Apps':
            'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Free Apps from Apple - Apple TV Remote, iTunes Remote, Music Memos, Shortcuts, Files, Measure, Pages, Numbers, Keynote, iMovie, GarageBand, iTunes U, Clips',
          'GPS Type': 'Assisted GPS, GLONASS, Galileo and QZSS',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3) and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
          'Video Formats': 'HEVC, H.264, MPEG-4 Part 2 and Motion JPEG',
        },
      },
      {
        'title': '',
        'values': {
          Width: '70.9 mm',
          Height: '143.6 mm',
          Depth: '7.7 mm',
          Weight: '177 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-xs-max',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone XS Max',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Sound Enhancements':
            '2 x Built-in Stereo Speaker, 2 x Built-in Microphone',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.16, Body: 1.17',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '16.51 cm (6.5 inch)',
          Resolution: '2688 x 1242 pixels',
          'Resolution Type': 'Super Retina HD Display',
          GPU: '4-core, Graphics Performance - Upto 50% Faster than A11 Bionic, Metal 2 Optimised, 3D, Graphics-intensive Gameplay, Faster and More Fluid',
          'Display Type': 'All-screen OLED Multi-touch Display',
          'HD Game Support': 'Yes',
          'Other Display Features':
            'HDR Display, 1000000:1 Contrast Ratio (Typical), True Tone Display (Six-channel Light Sensor), Wide Color Display (P3), 3D Touch, 625 nits Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 12',
          'Processor Type': 'A12 Bionic Chip',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Wide-angle and Telephoto Cameras, Wide-angle Lens: f/1.8 Aperture, Telephoto: f/2.4 Aperture, 2x Optical Zoom, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Dual Optical Image Stabilisation, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Smart HDR for Photos, Wide Color Capture for Photos and Live Photos, Local Tone Mapping, Advanced Red-eye Correction, Exposure Control, Auto Image Stabilisation, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Rear Camera AR, More Low-light Detail, Sharper Action Shots, 4K Video and Wider Stereo Playback, Face Detection, Facial Landmarking, Depth Mapping, Portrait Lighting, 4K Video Upto 60 fps',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '7MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera, Wide-angle Lens - f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Animoji and Memoji, Smart HDR for Photos, All-new Video Stabilisation, Cinematic Video Stabilisation (1080p and 720p), Wide Color Capture for Photos and Live Photos, Backside Illumination Sensor, Auto Image Stabilisation, Burst Mode, Exposure Control, Timer Mode, Front Camera AR, Enhanced Portrait Mode Selfies, 1080p HD Video Upto 60 fps',
          Flash:
            'Rear Quad-LED True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution': '2160p',
          'Digital Zoom': 'Digital Zoom Upto 10x',
          'Frame Rate':
            'Front Camera - 1080p HD Video Recording at 30 fps or 60 fps, Extended Dynamic Range for Video at 30 fps, 4K Video Upto 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Video Call Support': 'Yes',
          'Phone Book': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '3G, 4G, 2G',
          'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11ac with 2x2 MIMO',
          NFC: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM and eSIM',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '458 PPI',
          'Predictive Text Input': 'Yes',
          Sensors:
            'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi Languages Support',
          Games: 'Yes',
          'Other Features':
            'Chip - Next-generation Neural Engine, Rated IP68 - Splash, Water and Dust Resistant, Face ID - Enabled by TrueDepth Camera for Facial Recognition, Log-in to Your Apps and Accounts, Adaptive Recognition, Unlock in an Instant, Dot Projector (Unique Facial Map More than 30000 Invisible Dots), Infrared Camera, Flood Illuminator, NFC with Reader Mode, Express Cards with Power Reserve, Location - Digital Compass, Wi-Fi, Cellular, iBeacon micro-location, Audio Playback - Wider Stereo Playback, User-configurable Maximum Volume Limit, Video Playback - High Dynamic Range with Dolby Vision and HDR10 Content, External Buttons and Connectors - Volume Up / Down, Ring / Silent, Side Button, Lightning Connector, Charging via USB to Computer System or Power Adapter, Accessibility - VoiceOver, Zoom, Magnifier, RTT and TTY Support, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids - M3, T4, Multi Languages Support - QuickType Keyboard Support, QuickType Keyboard Support with Predictive Input, Siri, Dictation, Definition Dictionary Support, Thesaurus, Bilingual Dictionary Support with English, Spellcheck, No Home Button, Apple-designed CPU - 2 Performance Cores Upto 15% Faster than A11 Bionic, 4 Efficiency Cores Upto 50% Lower Power Usage than A11 Bionic, Apple-designed Neural Engine - 8-core Architecture, 5 Trillion Operations Per Second, Core ML Runs Upto 9x Faster than A11 Bionic, Enhanced ISP, End-to-end Encryption, Ongoing Security Updates, Limited Advertisers Tracking, Powered by Renewable Energy, Control iPhone with a Switch, Listen While You Read or Type, Easier-to-read Type, Privacy in Apps, iCloud, Copy and Paste between Devices ,Faster Wireless Charging, 4G LTE Advanced, Water Resistant to 2 Metres for up to 30 minutes',
          'Important Apps':
            'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Free Apps from Apple - Apple TV Remote, iTunes Remote, Music Memos, Shortcuts, Files, Measure, Pages, Numbers, Keynote, iMovie, GarageBand, iTunes U, Clips',
          'GPS Type': 'Assisted GPS, GLONASS, Galileo and QZSS',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3) and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
          'Video Formats': 'HEVC, H.264, MPEG-4 Part 2 and Motion JPEG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '77.4 mm',
          Height: '157.5 mm',
          Depth: '7.7 mm',
          Weight: '208 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-11',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 11',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Additional Content': 'Without AirPods and Charger',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.09, Body: 1.18',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '15.49 cm (6.1 inch)',
          Resolution: '1792 x 828 Pixels',
          'Resolution Type': 'Liquid Retina HD Display',
          'Display Type': 'Liquid Retina HD',
          'HD Game Support': 'Yes',
          'Other Display Features':
            '1400:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 625 nits Max Brightness (Typical), Fingerprint Resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
          '': '',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 14.2',
          'Processor Type': 'A13 Bionic Chip',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Ultra Wide and Wide Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Optical Image Stabilisation (Wide), Five Element Lens (Ultra Wide), Six Element Lens (Wide), Brighter True Tone Flash with Slow Sync, Panorama (Up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next-generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next Generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
          Flash:
            'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Frame Rate':
            'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Phone Book': 'Yes',
          'Speaker Phone': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '4G VOLTE, 4G, 3G, 2G',
          'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM and eSIM',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '326 PPI',
          Sensors:
            'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi Languages Support',
          Series: 'iPhone 11',
          'Other Features':
            'Faster Face ID, Slo-mo Selfies, Water Resistant Upto 2 Metres for Upto 30 Minutes',
          'Important Apps':
            'Built-in Apps - Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Files, Measure, Free Apps from Apple - iMovie, Pages, Numbers, Keynote, iTunes U, GarageBand, Apple TV Remote, iTunes Remote, Music Memos, Clips, Shortcuts',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
          'Video Formats':
            'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, Supports Dolby Vision and HDR10 Content',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '75.7 mm',
          Height: '150.9 mm',
          Depth: '8.3 mm',
          Weight: '194 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-11-pro',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 11 Pro',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.18, Body: 1.16',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '14.73 cm (5.8 inch)',
          Resolution: '2436 x 1125 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Other Display Features':
            '2,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 13',
          'Processor Type': 'A13 Bionic Chip',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Triple 12MP Ultra Wide, Wide and Telephoto Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Telephoto: f/2.0 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Dual Optical Image Stabilisation (Wide and Telephoto), Five Element Lens (Ultra Wide), Six-element Lens (Wide and Telephoto), Brighter True Tone flash with Slow Sync, Panorama (up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next Generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next-generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation(4K, 1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
          Flash:
            'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Frame Rate':
            'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Phone Book': 'Yes',
          'Speaker Phone': 'Yes',
        },
      },
      {
        'title': 'connectivity Features',
        'values': {
          'Network Type': '4G VOLTE, 4G, 3G, 2G',
          'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM and eSIM',
          'Removable Battery': 'No',
          'Graphics PPI': '458 PPI',
          Sensors:
            'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi Languages Support',
          Series: 'iPhone 11 Pro',
          'Other Features':
            'Water Resistant upto 4 Metres for up to 30 Minutes, Upto 5 More Hours of Battery life, Faster Face ID�',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
          'Video Formats':
            'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '71.4 mm',
          Height: '144 mm',
          Depth: '8.1 mm',
          Weight: '188 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-11-pro-max',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 11 Pro Max',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'SAR Value': '1.6 W/kg (over 1 g) SAR Limit, Head: 1.16, Body: 1.17',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '16.51 cm (6.5 inch)',
          Resolution: '2688 x 1242 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Other Display Features':
            '2,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 13',
          'Processor Type': 'A13 Bionic Chip',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Triple 12MP Ultra Wide, Wide and Telephoto Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Telephoto: f/2.0 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Dual Optical Image Stabilisation (Wide and Telephoto), Five Element Lens (Ultra Wide), Six-element Lens (Wide and Telephoto), Brighter True Tone flash with Slow Sync, Panorama (up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next Generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
          'Optical Zoom': 'Yes',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next-generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation (4K,1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
          Flash:
            'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Frame Rate':
            'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Phone Book': 'Yes',
          'Speaker Phone': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '4G VOLTE, 4G, 3G, 2G',
          'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '4G, 3G, Wi-Fi',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': '5',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano SIM and eSIM',
          'Removable Battery': 'No',
          'Graphics PPI': '458 PPI',
          Sensors:
            'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Supported Languages': 'Multi Languages Support',
          Series: 'iPhone 11 Pro Max',
          'Other Features':
            'Water Resistant upto 4 Metres for up to 30 Minutes, Upto 5 More Hours of Battery life, Faster Face ID�',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
          'Video Formats':
            'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '77.8 mm',
          Height: '158 mm',
          Depth: '8.1 mm',
          Weight: '226 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-12',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 12',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements': 'Built in Stereo Speak',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '15.49 cm (6.1 i',
          Resolution: '2532 x 1170 P',
          'Resolution Type': 'Super Retina XDR D',
          'Display Type': 'Super Retina XD',
          'Other Display Features': 'Super Retina XDR Display,',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 14',
          'Processor Type': 'A14 Bionic Chip w',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features': 'Dual 12MP Camera System (U',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features': 'TrueDepth Camera, 12MP Photo',
          Flash: 'Rear: Br',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution': '4K, 1080P, HDR Video Recordin',
          'Digital Zoom': 'Photo: Digital ',
          'Frame Rate': '24 fps, 30 fp',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G LTE, WCDMA, GS',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi‑Fi 6 (802.11a',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '460 PPI',
          Sensors: 'Face ID, B',
          Browser: 'Safari',
          'Other Features': 'Splash, Water and',
          'GPS Type': 'Built-in GP',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats': 'Audio Formats Su',
          'Video Formats': 'HEVC, H.264, MPE',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '71.5 mm',
          Height: '146.7 mm',
          Depth: '7.4 mm',
          Weight: '162 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-12-mini',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 12 Mini',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements': 'Built‑in Stereo Speaker',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '13.72 cm (5.4 inch)',
          Resolution: '2340 x 1080 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 5.4 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 2000000:1 Contrast Ratio (Typical), 625 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 14',
          'Processor Type':
            'A14 Bionic Chip with Next Generation Neural Engine',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Camera System (Ultra Wide and Wide), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Night Mode, Deep Fusion, Optical Image Stabilisation, 2x Optical Zoom Out, Digital Zoom Upto 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom Out, Digital Zoom Upto 3x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
          Flash:
            'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K, 1080P, HDR Video Recording with Dolby Vision Upto 30 fps',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
          'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '476 PPI',
          Sensors:
            'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          Browser: 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '64.2 mm',
          Height: '131.5 mm',
          Depth: '7.4 mm',
          Weight: '133 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-12-pro',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 12 Pro',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements': 'Built‑in Stereo Speaker',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '15.49 cm (6.1 inch)',
          Resolution: '2532 x 1170 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 6.1 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour, Haptic Touch, 2000000:1 Contrast Ratio (Typical), 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 14',
          'Processor Type':
            'A14 Bionic Chip with Next Generation Neural Engine',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Pro 12MP Camera System (Ultra Wide, Wide and Telephoto), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Telephoto: f/2.0 Aperture, Night Mode, Deep Fusion, Apple ProRAW, Dual Optical Image Stabilisation, 2x Optical Zoom in, 2x Optical Zoom Out, 4x Optical Zoom Range, Digital Zoom Upto 10x, Night Mode Portrait, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 60 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom In, 2x Optical Zoom Out, Digital Zoom Upto 6x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
          Flash:
            'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K, 1080p, HDR Video Recording with Dolby Vision Upto 60 fps',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 10x, Video: Digital Zoom Upto 6x',
          'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '460 PPI',
          Sensors:
            'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          Browser: 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '71.5 mm',
          Height: '146.7 mm',
          Depth: '7.4 mm',
          Weight: '187 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-12-pro-max',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 12 Pro Max',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements': 'Built‑in Stereo Speaker',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '17.02 cm (6.7 inch)',
          Resolution: '2778 x 1284 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 6.7 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour, Haptic Touch, 2000000:1 Contrast Ratio (Typical), 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 14',
          'Processor Type':
            'A14 Bionic Chip with Next Generation Neural Engine',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Pro 12MP Camera System (Ultra Wide, Wide and Telephoto), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Telephoto: f/2.0 Aperture, Night Mode, Deep Fusion, Apple ProRAW, Dual Optical Image Stabilisation, 2x Optical Zoom in, 2x Optical Zoom Out, 4x Optical Zoom Range, Digital Zoom Upto 10x, Night Mode Portrait, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 60 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom In, 2x Optical Zoom Out, Digital Zoom Upto 6x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
          Flash:
            'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K, 1080p, HDR Video Recording with Dolby Vision Upto 60 fps',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 10x, Video: Digital Zoom Upto 7x',
          'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '458 PPI',
          Sensors:
            'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          Browser: 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Audio Formats':
            'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '78.1 mm',
          Height: '160.8 mm',
          Depth: '7.4 mm',
          Weight: '226 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-13',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 13',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements':
            'Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '15.49 cm (6.1 inch)',
          Resolution: '2532 x 1170 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 6.1‑inch (Diagonal) All‑screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 800 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 15',
          'Processor Type': 'A15 Bionic Chip',
          'Processor Core': 'Hexa Core',
          'Operating Frequency':
            '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Camera System (Wide and Ultra Wide), Wide: f/1.6 Aperture, Ultra Wide: f/2.4 Aperture, 120 Degree FOV, 2x Optical Zoom out, Digital Zoom up to 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Sensor-shift Optical Image Stabilisation (Wide), Seven‑element Lens (Wide), Five‑element Lens (Ultra Wide), Panorama (up to 63MP), Sapphire Crystal Lens Cover, 100% Focus Pixels (Wide), Night Mode Deep Fusion, Smart HDR 4, Photographic Styles, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Video Recording: Sensor-shift OIS for Video (Wide), Audio Zoom, QuickTake Video, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), Continuous AF Video, Playback Zoom, Stereo Recording',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
          Flash: 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
          'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '460 PPI',
          Sensors:
            'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          Browser: 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '71.5 mm',
          Height: '146.7 mm',
          Depth: '7.65 mm',
          Weight: '173 g',
        },
      },
    ],
  },
  {
    productCode: 'apple-iphone-13-mini',
    productSpecs: [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 13 Mini',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          "Touchscreen": 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements':
            'Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '13.72 cm (5.4 inch)',
          Resolution: '2340 x 1080 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 5.4‑inch (Diagonal) All‑screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 800 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 15',
          'Processor Type': 'A15 Bionic Chip',
          'Processor Core': 'Hexa Core',
          'Operating Frequency':
            '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP',
          'Primary Camera Features':
            'Dual 12MP Camera System (Wide and Ultra Wide), Wide: f/1.6 Aperture, Ultra Wide: f/2.4 Aperture, 120 Degree FOV, 2x Optical Zoom out, Digital Zoom up to 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Sensor-shift Optical Image Stabilisation (Wide), Seven‑element Lens (Wide), Five‑element Lens (Ultra Wide), Panorama (up to 63MP), Sapphire Crystal Lens Cover, 100% Focus Pixels (Wide), Night Mode Deep Fusion, Smart HDR 4, Photographic Styles, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Video Recording: Sensor-shift OIS for Video (Wide), Audio Zoom, QuickTake Video, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), Continuous AF Video, Playback Zoom, Stereo Recording',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
          Flash: 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
          'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2x2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          NFC: 'Yes',
          EDGE: 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          Smartphone: 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          SMS: 'Yes',
          'Graphics PPI': '476 PPI',
          Sensors:
            'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          Browser: 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          Width: '64.2 mm',
          Height: '131.5 mm',
          Depth: '7.65 mm',
          Weight: '140 g',
        },
      },
    ],
  },
  {
    'productCode': 'apple-iphone-13-pro',
    'productSpecs': [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 13 Pro',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          '"Touchscreen"': 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements':
            'Dolby Digital (AC-3), Dolby Digital Plus (E‑AC-3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '15.49 cm (6.1 inch)',
          'Resolution': '2532 x 1170 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 6.1‑inch (Diagonal) All‑screen OLED Display, ProMotion Technology with Adaptive Refresh Rates up to 120Hz, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 1000 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 15',
          'Processor Type': 'A15 Bionic Chip',
          'Processor Core': 'Hexa Core',
          'Operating Frequency':
            '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Pro 12MP Camera System (Telephoto, Wide and Ultra Wide), Telephoto: f/2.8 Aperture, Wide: f/1.5 Aperture, Ultra Wide: f/1.8 Aperture, 120 Degree FOV, 3x Optical Zoom In, 2x Optical Zoom out, 6x Optical Zoom Range, Digital Zoom up to 15x, Night Mode Portraits Enabled by LiDAR Scanner, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Dual Optical Image Stabilisation (Telephoto and Wide), Sensor‑shift Optical Image Stabilisation (Wide), Six‑element Lens (Telephoto and Ultra Wide), Seven‑element Lens (Wide), Panorama (up to 63MP), 100% Focus Pixels (Wide), Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Macro Photography, Apple ProRAW, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Apple ProRAW, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time-lapse Video with Stabilisation, Night Mode Time‑lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
          'Flash': 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 15x, Video: Digital Zoom Upto 9x',
          'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Call Features',
        'values': {
          'Call Wait/Hold': 'Yes',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2 x 2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          'NFC': 'Yes',
          'EDGE': 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'ther Details',
        'values': {
          'Smartphone': 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          'SMS': 'Yes',
          'Graphics PPI': '460 PPI',
          'Sensors':
            'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Browser': 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          'Width': '71.5 mm',
          'Height': '146.7 mm',
          'Depth': '7.65 mm',
          'Weight': '203 g',
        },
      },
    ],
  },
  {
    'productCode': 'apple-iphone-13-pro-max',
    'productSpecs': [
      {
        'title': 'General',
        'values': {
          'Model Name': 'iPhone 13 Pro Max',
          'Browse Type': 'Smartphones',
          'SIM Type': 'Dual Sim',
          'Hybrid Sim Slot': 'No',
          '"Touchscreen"': 'Yes',
          'OTG Compatible': 'No',
          'Quick Charging': 'Yes',
          'Sound Enhancements':
            'Dolby Digital (AC-3), Dolby Digital Plus (E‑AC-3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
        },
      },
      {
        'title': 'Display Features',
        'values': {
          'Display Size': '17.02 cm (6.7 inch)',
          'Resolution': '2778 x 1284 Pixels',
          'Resolution Type': 'Super Retina XDR Display',
          'Display Type': 'Super Retina XDR Display',
          'Other Display Features':
            'Super Retina XDR Display, 6.7‑inch (Diagonal) All‑screen OLED Display, ProMotion Technology with Adaptive Refresh Rates up to 120Hz, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 1000 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
        },
      },
      {
        'title': 'Os & Processor Features',
        'values': {
          'Operating System': 'iOS 15',
          'Processor Type': 'A15 Bionic Chip',
          'Processor Core': 'Hexa Core',
          'Operating Frequency':
            '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
        },
      },
      {
        'title': 'Camera Features',
        'values': {
          'Primary Camera Available': 'Yes',
          'Primary Camera': '12MP + 12MP + 12MP',
          'Primary Camera Features':
            'Pro 12MP Camera System (Telephoto, Wide and Ultra Wide), Telephoto: f/2.8 Aperture, Wide: f/1.5 Aperture, Ultra Wide: f/1.8 Aperture, 120 Degree FOV, 3x Optical Zoom In, 2x Optical Zoom out, 6x Optical Zoom Range, Digital Zoom up to 15x, Night Mode Portraits Enabled by LiDAR Scanner, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Dual Optical Image Stabilisation (Telephoto and Wide), Sensor‑shift Optical Image Stabilisation (Wide), Six‑element Lens (Telephoto and Ultra Wide), Seven‑element Lens (Wide), Panorama (up to 63MP), 100% Focus Pixels (Wide), Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Macro Photography, Apple ProRAW, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
          'Secondary Camera Available': 'Yes',
          'Secondary Camera': '12MP Front Camera',
          'Secondary Camera Features':
            '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Apple ProRAW, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time-lapse Video with Stabilisation, Night Mode Time‑lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
          'Flash': 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
          'HD Recording': 'Yes',
          'Full HD Recording': 'Yes',
          'Video Recording': 'Yes',
          'Video Recording Resolution':
            '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
          'Digital Zoom':
            'Photo: Digital Zoom Upto 15x, Video: Digital Zoom Upto 9x',
          'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
          'Dual Camera Lens': 'Primary Camera',
        },
      },
      {
        'title': 'Connectivity Features',
        'values': {
          'Network Type': '5G, 4G, 3G, 2G',
          'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
          'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
          '3G': 'Yes',
          'Pre-installed Browser': 'Safari',
          'Bluetooth Support': 'Yes',
          'Bluetooth Version': 'v5.0',
          'Wi-Fi': 'Yes',
          'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2 x 2 MIMO',
          'Wi-Fi Hotspot': 'Yes',
          'NFC': 'Yes',
          'EDGE': 'Yes',
          'Map Support': 'Maps',
          'GPS Support': 'Yes',
        },
      },
      {
        'title': 'Other Details',
        'values': {
          'Smartphone': 'Yes',
          'SIM Size': 'Nano + eSIM',
          'Mobile Tracker': 'Yes',
          'Removable Battery': 'No',
          'SMS': 'Yes',
          'Graphics PPI': '458 PPI',
          'Sensors':
            'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
          'Browser': 'Safari',
          'Other Features':
            'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
          'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
        },
      },
      {
        'title': 'Multimedia Features',
        'values': {
          'Video Formats':
            'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
        },
      },
      {
        'title': 'Dimensions',
        'values': {
          'Width': '78.1 mm',
          'Height': '160.8 mm',
          'Depth': '7.65 mm',
          'Weight': '238 g',
        },
      },
    ],
  },
]);



// async addMultipleProductSpecs() {
//     const newProductSpecs = await this.productSpecsModel.insertMany(
//       [
//       {
//         productCode: 'apple-iphone-8',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 8',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Single Sim',
//               Touchscreen: 'Yes',
//               'Sound Enhancements':
//                 'Built-in Stereo Speaker, Built-in Microphone',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.20, Body: 1.13',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '11.94 cm (4.7 inch)',
//               Resolution: '1334 x 750 Pixels',
//               'Resolution Type': 'Retina HD Display',
//               'Display Type':
//                 'Widescreen LCD Multi-touch Display with IPS Technology',
//               'Other Display Features':
//                 '1400:1 Contrast Ratio (Typical), True Tone Display, Wide Color Display (P3), 3D Touch, 625 cd/m2 Max Brightness (Typical), Dual-domain Pixels for Wide Viewing Angles, Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously, Display Zoom, Reachability',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type':
//                 'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor',
//               'Operating Frequency':
//                 '4G FDD-LTE (Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 29, 30, 66)',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP Rear Camera',
//               'Primary Camera Features':
//                 'f/1.8 Aperture, Optical Image Stabilization, Six Element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Live Photos with Stabilization, Wide Color Capture for Photos and Live Photos, Improved Local Tone Mapping, Body and Face Detection, Exposure Control, Noise Reduction, Auto HDR for Photos, Auto Image Stabilization, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF And JPEG',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '7MP Front Camera',
//               'Secondary Camera Features':
//                 '1080p HD Video Recording, f/2.2 Aperture, Wide Color Capture for Photos and Live Photos, Auto HDR, Backside Illumination Sensor, Body and Face Detection, Auto Image Stabilization, Burst Mode, Exposure Control, Timer Mode',
//               Flash:
//                 'Rear Quad LED True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution': '3840 x 2160 Pixels',
//               'Digital Zoom': 'Digital Zoom Upto 5x',
//               'Frame Rate':
//                 '4K Video Recording At 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording At 30 fps, Slo-Mo Video Support for 1080P at 120 fps or 240 fps fps',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '3G, 4G, 2G',
//               'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11 ac (Wi-Fi with MIMO)',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM',
//               SMS: 'Yes',
//               'Graphics PPI': '326 PPI',
//               'Predictive Text Input': 'Yes',
//               Sensors:
//                 'Touch ID Fingerprint Sensor Built into the Home Button, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi-language Support',
//               'Other Features':
//                 'Apple ID (Required for Some Features) - Syncing with iTunes on a Mac or PC Requires: Mac - OS X 10.9.5 or Later, PC - Windows 7 or Later, iTunes 12.7 or Later, Rating for Hearing Aids: M3, NFC with Reader Mode, Accessibility: VoiceOver, Siri and Dictation, AssistiveTouch, Zoom, Type to Siri, Speak Screen, Magnifier, Switch Control, Software TTY, Closed Captions, System Requirements, Video Recording: 4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Optical Image Stabilization for Video, Optical Zoom: 6x Digital Zoom (iphone 8 Plus Only), Quad LED True Tone Flash, Slo-Mo Video Support for 1080P at 120 fps or 240 fps, Time-lapse Video with Stabilization, Cinematic Video Stabilization (1080P and 720P), Continuous Autofocus Video, Body and Face Detection, Noise Reduction, Take 8MP Still Photos while Recording 4K Video, Playback Zoom, Video Geotagging, Video Formats Recorded: HEVC and H.264, Apple Pay, Location: Digital Compass, Wi-Fi, Cellular, iBeacon Microlocation, Lightning Connector',
//               'Important Apps':
//                 'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, News, Contacts, iBooks, Home, Weather, Reminders, Clock, TV, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, iCloud Drive, Find My iPhone, Find My Friends, Settings, Files',
//               'GPS Type': 'Assisted GPS, GLONASS, Galileo, QZSS',
//             },
//           },
//           {
//             'title': 'Multimedia Features',
//             'values': {
//               'Audio Formats':
//                 'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3), Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)',
//               'Video Formats':
//                 'HEVC, H.264, MPEG-4 Part 2, Motion JPEG Supports Dolby Vision and HDR10 Content',
//             },
//           },
//           {
//             'title': 'Dimensions',
//             'values': {
//               'Width': '67.3 mm',
//               'Height': '138.4 mm',
//               'Depth': '7.3 mm',
//               'Weight': '148 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-x',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone X',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Single Sim',
//               Touchscreen: 'Yes',
//               'Sound Enhancements':
//                 'Built-in Stereo Speaker, Built-in Microphone',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.09, Body: 1.17',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '14.73 cm (5.8 inch)',
//               Resolution: '2436 x 1125 Pixels',
//               'Resolution Type': 'Super Retina HD Display',
//               'Display Type': 'All-screen OLED Multi-touch Display',
//               'Other Display Features':
//                 'HDR Display, 1,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Color Display (P3), 3D Touch, 625 cd/m2 Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type':
//                 'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Wide-angle and Telephoto Cameras, Wide-angle: f/1.8 Aperture, Telephoto: f/2.4 Aperture, Portrait Mode, Portrait Lighting (Beta), Dual Optical Image Stabilization, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Live Photos with Stabilization, Wide Color Capture for Photos and Live Photos, Improved local Tone Mapping, Body and Face Detection, Exposure Control, Noise Reduction, Auto HDR for Photos, Auto Image Stabilization, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '7MP Front Camera',
//               'Secondary Camera Features':
//                 'Portrait Mode, Portrait Lighting (Beta), Animoji, 1080p HD Video Recording, f/2.2 Aperture, Wide Color Capture for Photos and Live Photos, Auto HDR, Backside Illumination Sensor, Body and Face Detection, Auto Image Stabilization, Burst Mode, Exposure Control, Timer Mode',
//               Flash:
//                 'Rear Quad LED True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution': '3840 x 2160 Pixels',
//               'Digital Zoom': 'Digital Zoom Upto 10x',
//               'Frame Rate':
//                 '4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Slo-Mo Video Support for 1080P at 120 fps or 240 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '3G, 4G, 2G',
//               'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11 ac (Wi-Fi with MIMO)',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM',
//               SMS: 'Yes',
//               'Graphics PPI': '458 PPI',
//               'Predictive Text Input': 'Yes',
//               Sensors:
//                 'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi-language Support',
//               'Other Features':
//                 'Video Recording: 4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Optical Image Stabilization for Video, Optical Zoom: 6x Digital Zoom, Quad LED True Tone Flash, Slo-Mo Video Support for 1080P at 120 fps or 240 fps, Time-lapse Video with Stabilization, Cinematic Video Stabilization (1080P and 720P), Continuous Autofocus Video, Body and Face Detection, Noise Reduction, Take 8MP Still Photos while Recording 4K Video, Playback Zoom, Video Geotagging, Video Formats Recorded: HEVC and H.264, Face ID: Enabled by TrueDepth Camera for Facial Recognition, Apple Pay, NFC with Reader Mode, Location: Digital Compass, Wi-Fi, Cellular, iBeacon Microlocation, Accessibility: VoiceOver, Zoom, Magnifier, Software TTY, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids: iPhone X (Model A1865, A1901): M3, T4, System Requirements - Apple ID (Required for Some Features), Syncing with iTunes on a Mac or PC Requires - Mac: OS X 10.10.5 or Later, PC: Windows 7 or Later, iTunes 12.7 or Later',
//               'Important Apps':
//                 'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Siri, Calendar, iTunes Store, App Store, Notes, News, Contacts, iBooks, Home, Weather, Reminders, Clock, TV, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Files',
//               'GPS Type': 'Assisted GPS, GLONASS, Galileo, QZSS',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3), Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)',
//               'Video Formats':
//                 'HEVC, H.264, MPEG-4 Part 2, Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '70.9 mm',
//               Height: '143.6 mm',
//               Depth: '7.7 mm',
//               Weight: '174 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-xs',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone XS',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Sound Enhancements':
//                 '2 x Built-in Stereo Speaker, 2 x Built-in Microphone',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.19, Body: 1.18',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '14.73 cm (5.8 inch)',
//               Resolution: '2436 x 1125 pixels',
//               'Resolution Type': 'Super Retina HD Display',
//               GPU: '4-core, Graphics Performance - Upto 50% Faster than A11 Bionic, Metal 2 Optimised, 3D, Graphics-intensive Gameplay, Faster and More Fluid',
//               'Display Type': 'All-screen OLED Multi-touch Display',
//               'HD Game Support': 'Yes',
//               'Other Display Features':
//                 'HDR Display, 1000000:1 Contrast Ratio (Typical), True Tone Display (Six-channel Light Sensor), Wide Color Display (P3), 3D Touch, 625 nits Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A12 Bionic Chip',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Wide-angle and Telephoto Cameras, Wide-angle Lens: f/1.8 Aperture, Telephoto: f/2.4 Aperture, 2x Optical Zoom, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Dual Optical Image Stabilisation, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Smart HDR for Photos, Wide Color Capture for Photos and Live Photos, Local Tone Mapping, Advanced Red-eye Correction, Exposure Control, Auto Image Stabilisation, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Rear Camera AR, More Low-light Detail, Sharper Action Shots, 4K Video and Wider Stereo Playback, Face Detection, Facial Landmarking, Depth Mapping, Portrait Lighting, 4K Video Upto 60 fps',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '7MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera, Wide-angle Lens - f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Animoji and Memoji, Smart HDR for Photos, All-new Video Stabilisation, Cinematic Video Stabilisation (1080p and 720p), Wide Color Capture for Photos and Live Photos, Backside Illumination Sensor, Auto Image Stabilisation, Burst Mode, Exposure Control, Timer Mode, Front Camera AR, Enhanced Portrait Mode Selfies, 1080p HD Video Upto 60 fps',
//               Flash:
//                 'Rear Quad-LED True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution': '2160p',
//               'Digital Zoom': 'Digital Zoom Upto 10x',
//               'Frame Rate':
//                 'Front Camera - 1080p HD Video Recording at 30 fps or 60 fps, Extended Dynamic Range for Video at 30 fps, 4K Video Upto 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Video Call Support': 'Yes',
//               'Phone Book': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '3G, 4G, 2G',
//               'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11ac with 2x2 MIMO',
//               NFC: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM and eSIM',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '458 PPI',
//               'Predictive Text Input': 'Yes',
//               Sensors:
//                 'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi Languages Support',
//               Games: 'Yes',
//               'Other Features':
//                 'Chip - Next-generation Neural Engine, Rated IP68 - Splash, Water and Dust Resistant, Face ID - Enabled by TrueDepth Camera for Facial Recognition, Log-in to Your Apps and Accounts, Adaptive Recognition, Unlock in an Instant, Dot Projector (Unique Facial Map More than 30000 Invisible Dots), Infrared Camera, Flood Illuminator, NFC with Reader Mode, Express Cards with Power Reserve, Location - Digital Compass, Wi-Fi, Cellular, iBeacon micro-location, Audio Playback - Wider Stereo Playback, User-configurable Maximum Volume Limit, Video Playback - High Dynamic Range with Dolby Vision and HDR10 Content, External Buttons and Connectors - Volume Up / Down, Ring / Silent, Side Button, Lightning Connector, Charging via USB to Computer System or Power Adapter, Accessibility - VoiceOver, Zoom, Magnifier, RTT and TTY Support, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids - M3, T4, Multi Languages Support - QuickType Keyboard Support, QuickType Keyboard Support with Predictive Input, Siri, Dictation, Definition Dictionary Support, Thesaurus, Bilingual Dictionary Support with English, Spellcheck, No Home Button, Apple-designed CPU - 2 Performance Cores Upto 15% Faster than A11 Bionic, 4 Efficiency Cores Upto 50% Lower Power Usage than A11 Bionic, Apple-designed Neural Engine - 8-core Architecture, 5 Trillion Operations Per Second, Core ML Runs Upto 9x Faster than A11 Bionic, Enhanced ISP, End-to-end Encryption, Ongoing Security Updates, Limited Advertisers Tracking, Powered by Renewable Energy, Control iPhone with a Switch, Listen While You Read or Type, Easier-to-read Type, Privacy in Apps, iCloud, Copy and Paste between Devices ,Faster Wireless Charging, 4G LTE Advanced, Water Resistant to 2 Metres for up to 30 minutes',
//               'Important Apps':
//                 'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Free Apps from Apple - Apple TV Remote, iTunes Remote, Music Memos, Shortcuts, Files, Measure, Pages, Numbers, Keynote, iMovie, GarageBand, iTunes U, Clips',
//               'GPS Type': 'Assisted GPS, GLONASS, Galileo and QZSS',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3) and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
//               'Video Formats': 'HEVC, H.264, MPEG-4 Part 2 and Motion JPEG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '70.9 mm',
//               Height: '143.6 mm',
//               Depth: '7.7 mm',
//               Weight: '177 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-xs-max',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone XS Max',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Sound Enhancements':
//                 '2 x Built-in Stereo Speaker, 2 x Built-in Microphone',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.16, Body: 1.17',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '16.51 cm (6.5 inch)',
//               Resolution: '2688 x 1242 pixels',
//               'Resolution Type': 'Super Retina HD Display',
//               GPU: '4-core, Graphics Performance - Upto 50% Faster than A11 Bionic, Metal 2 Optimised, 3D, Graphics-intensive Gameplay, Faster and More Fluid',
//               'Display Type': 'All-screen OLED Multi-touch Display',
//               'HD Game Support': 'Yes',
//               'Other Display Features':
//                 'HDR Display, 1000000:1 Contrast Ratio (Typical), True Tone Display (Six-channel Light Sensor), Wide Color Display (P3), 3D Touch, 625 nits Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A12 Bionic Chip',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Wide-angle and Telephoto Cameras, Wide-angle Lens: f/1.8 Aperture, Telephoto: f/2.4 Aperture, 2x Optical Zoom, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Dual Optical Image Stabilisation, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Smart HDR for Photos, Wide Color Capture for Photos and Live Photos, Local Tone Mapping, Advanced Red-eye Correction, Exposure Control, Auto Image Stabilisation, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Rear Camera AR, More Low-light Detail, Sharper Action Shots, 4K Video and Wider Stereo Playback, Face Detection, Facial Landmarking, Depth Mapping, Portrait Lighting, 4K Video Upto 60 fps',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '7MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera, Wide-angle Lens - f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Five Effects (Natural, Studio, Contour, Stage, Stage Mono), Animoji and Memoji, Smart HDR for Photos, All-new Video Stabilisation, Cinematic Video Stabilisation (1080p and 720p), Wide Color Capture for Photos and Live Photos, Backside Illumination Sensor, Auto Image Stabilisation, Burst Mode, Exposure Control, Timer Mode, Front Camera AR, Enhanced Portrait Mode Selfies, 1080p HD Video Upto 60 fps',
//               Flash:
//                 'Rear Quad-LED True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution': '2160p',
//               'Digital Zoom': 'Digital Zoom Upto 10x',
//               'Frame Rate':
//                 'Front Camera - 1080p HD Video Recording at 30 fps or 60 fps, Extended Dynamic Range for Video at 30 fps, 4K Video Upto 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Video Call Support': 'Yes',
//               'Phone Book': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '3G, 4G, 2G',
//               'Supported Networks': 'GSM, WCDMA, 4G LTE, UMTS',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11ac with 2x2 MIMO',
//               NFC: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM and eSIM',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '458 PPI',
//               'Predictive Text Input': 'Yes',
//               Sensors:
//                 'Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi Languages Support',
//               Games: 'Yes',
//               'Other Features':
//                 'Chip - Next-generation Neural Engine, Rated IP68 - Splash, Water and Dust Resistant, Face ID - Enabled by TrueDepth Camera for Facial Recognition, Log-in to Your Apps and Accounts, Adaptive Recognition, Unlock in an Instant, Dot Projector (Unique Facial Map More than 30000 Invisible Dots), Infrared Camera, Flood Illuminator, NFC with Reader Mode, Express Cards with Power Reserve, Location - Digital Compass, Wi-Fi, Cellular, iBeacon micro-location, Audio Playback - Wider Stereo Playback, User-configurable Maximum Volume Limit, Video Playback - High Dynamic Range with Dolby Vision and HDR10 Content, External Buttons and Connectors - Volume Up / Down, Ring / Silent, Side Button, Lightning Connector, Charging via USB to Computer System or Power Adapter, Accessibility - VoiceOver, Zoom, Magnifier, RTT and TTY Support, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids - M3, T4, Multi Languages Support - QuickType Keyboard Support, QuickType Keyboard Support with Predictive Input, Siri, Dictation, Definition Dictionary Support, Thesaurus, Bilingual Dictionary Support with English, Spellcheck, No Home Button, Apple-designed CPU - 2 Performance Cores Upto 15% Faster than A11 Bionic, 4 Efficiency Cores Upto 50% Lower Power Usage than A11 Bionic, Apple-designed Neural Engine - 8-core Architecture, 5 Trillion Operations Per Second, Core ML Runs Upto 9x Faster than A11 Bionic, Enhanced ISP, End-to-end Encryption, Ongoing Security Updates, Limited Advertisers Tracking, Powered by Renewable Energy, Control iPhone with a Switch, Listen While You Read or Type, Easier-to-read Type, Privacy in Apps, iCloud, Copy and Paste between Devices ,Faster Wireless Charging, 4G LTE Advanced, Water Resistant to 2 Metres for up to 30 minutes',
//               'Important Apps':
//                 'Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Free Apps from Apple - Apple TV Remote, iTunes Remote, Music Memos, Shortcuts, Files, Measure, Pages, Numbers, Keynote, iMovie, GarageBand, iTunes U, Clips',
//               'GPS Type': 'Assisted GPS, GLONASS, Galileo and QZSS',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3) and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
//               'Video Formats': 'HEVC, H.264, MPEG-4 Part 2 and Motion JPEG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '77.4 mm',
//               Height: '157.5 mm',
//               Depth: '7.7 mm',
//               Weight: '208 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-11',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 11',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Additional Content': 'Without AirPods and Charger',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.09, Body: 1.18',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '15.49 cm (6.1 inch)',
//               Resolution: '1792 x 828 Pixels',
//               'Resolution Type': 'Liquid Retina HD Display',
//               'Display Type': 'Liquid Retina HD',
//               'HD Game Support': 'Yes',
//               'Other Display Features':
//                 '1400:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 625 nits Max Brightness (Typical), Fingerprint Resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//               '': '',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A13 Bionic Chip',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Ultra Wide and Wide Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Optical Image Stabilisation (Wide), Five Element Lens (Ultra Wide), Six Element Lens (Wide), Brighter True Tone Flash with Slow Sync, Panorama (Up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next-generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next Generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Frame Rate':
//                 'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Phone Book': 'Yes',
//               'Speaker Phone': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '4G VOLTE, 4G, 3G, 2G',
//               'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM and eSIM',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '326 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi Languages Support',
//               Series: 'iPhone 11',
//               'Other Features':
//                 'Faster Face ID, Slo-mo Selfies, Water Resistant Upto 2 Metres for Upto 30 Minutes',
//               'Important Apps':
//                 'Built-in Apps - Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Safari, Maps, Siri, Calendar, iTunes Store, App Store, Notes, Contacts, Books, Home, Weather, Reminders, Clock, Videos, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Files, Measure, Free Apps from Apple - iMovie, Pages, Numbers, Keynote, iTunes U, GarageBand, Apple TV Remote, iTunes Remote, Music Memos, Clips, Shortcuts',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
//               'Video Formats':
//                 'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, Supports Dolby Vision and HDR10 Content',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '75.7 mm',
//               Height: '150.9 mm',
//               Depth: '8.3 mm',
//               Weight: '194 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-11-pro',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 11 Pro',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.18, Body: 1.16',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '14.73 cm (5.8 inch)',
//               Resolution: '2436 x 1125 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 '2,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A13 Bionic Chip',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Triple 12MP Ultra Wide, Wide and Telephoto Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Telephoto: f/2.0 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Dual Optical Image Stabilisation (Wide and Telephoto), Five Element Lens (Ultra Wide), Six-element Lens (Wide and Telephoto), Brighter True Tone flash with Slow Sync, Panorama (up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next Generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next-generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation(4K, 1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Frame Rate':
//                 'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Phone Book': 'Yes',
//               'Speaker Phone': 'Yes',
//             },
//           },
//           {
//             title: 'connectivity Features',
//             values: {
//               'Network Type': '4G VOLTE, 4G, 3G, 2G',
//               'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM and eSIM',
//               'Removable Battery': 'No',
//               'Graphics PPI': '458 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi Languages Support',
//               Series: 'iPhone 11 Pro',
//               'Other Features':
//                 'Water Resistant upto 4 Metres for up to 30 Minutes, Upto 5 More Hours of Battery life, Faster Face ID�',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
//               'Video Formats':
//                 'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '71.4 mm',
//               Height: '144 mm',
//               Depth: '8.1 mm',
//               Weight: '188 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-11-pro-max',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 11 Pro Max',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'SAR Value':
//                 '1.6 W/kg (over 1 g) SAR Limit, Head: 1.16, Body: 1.17',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '16.51 cm (6.5 inch)',
//               Resolution: '2688 x 1242 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 '2,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Colour Display (P3), Haptic Touch, 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A13 Bionic Chip',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Triple 12MP Ultra Wide, Wide and Telephoto Cameras, Ultra Wide: f/2.4 Aperture and 120Degree Field of View, Wide: f/1.8 Aperture, Telephoto: f/2.0 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-key Mono), Dual Optical Image Stabilisation (Wide and Telephoto), Five Element Lens (Ultra Wide), Six-element Lens (Wide and Telephoto), Brighter True Tone flash with Slow Sync, Panorama (up to 64MP), 100% Focus Pixels (Wide), Night Mode, Auto Adjustments, Next Generation Smart HDR for Photos, Wide Colour Capture for Photos and Live Photos, Advanced Red Eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
//               'Optical Zoom': 'Yes',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera - 12MP Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High Key Mono), Animoji and Memoji, 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Next-generation Smart HDR for Photos, Extended Dynamic Range for Video at 30 fps, Cinematic Video Stabilisation (4K,1080p and 720p), Wide Colour Capture for Photos and Live Photos, Retina Flash, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear Brighter True Tone Flash with Slow Sync and Front Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Frame Rate':
//                 'Rear Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, 720p HD Video Recording at 30 fps, Extended Dynamic Range for Video upto 60 fps, Slow-motion Video Support for 1080p at 120 fps or 240 fps | True Depth Camera - 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Extended Dynamic Range for Video at 30 fps fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Phone Book': 'Yes',
//               'Speaker Phone': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '4G VOLTE, 4G, 3G, 2G',
//               'Supported Networks': '4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '4G, 3G, Wi-Fi',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': '5',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': '802.11ax Wi-Fi 6 with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano SIM and eSIM',
//               'Removable Battery': 'No',
//               'Graphics PPI': '458 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three Axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               'Supported Languages': 'Multi Languages Support',
//               Series: 'iPhone 11 Pro Max',
//               'Other Features':
//                 'Water Resistant upto 4 Metres for up to 30 Minutes, Upto 5 More Hours of Battery life, Faster Face ID�',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'AAC LC, HE AAC, HE AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC 3), Dolby Digital Plus (E AC 3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+)',
//               'Video Formats':
//                 'HEVC, H.264, MPEG 4 Part 2 and Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '77.8 mm',
//               Height: '158 mm',
//               Depth: '8.1 mm',
//               Weight: '226 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-12',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 12',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements': 'Built in Stereo Speak',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '15.49 cm (6.1 i',
//               Resolution: '2532 x 1170 P',
//               'Resolution Type': 'Super Retina XDR D',
//               'Display Type': 'Super Retina XD',
//               'Other Display Features': 'Super Retina XDR Display,',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A14 Bionic Chip w',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features': 'Dual 12MP Camera System (U',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features': 'TrueDepth Camera, 12MP Photo',
//               Flash: 'Rear: Br',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution': '4K, 1080P, HDR Video Recordin',
//               'Digital Zoom': 'Photo: Digital ',
//               'Frame Rate': '24 fps, 30 fp',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G LTE, WCDMA, GS',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi‑Fi 6 (802.11a',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '460 PPI',
//               Sensors: 'Face ID, B',
//               Browser: 'Safari',
//               'Other Features': 'Splash, Water and',
//               'GPS Type': 'Built-in GP',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats': 'Audio Formats Su',
//               'Video Formats': 'HEVC, H.264, MPE',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '71.5 mm',
//               Height: '146.7 mm',
//               Depth: '7.4 mm',
//               Weight: '162 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-12-mini',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 12 Mini',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements': 'Built‑in Stereo Speaker',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '13.72 cm (5.4 inch)',
//               Resolution: '2340 x 1080 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 5.4 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 2000000:1 Contrast Ratio (Typical), 625 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type':
//                 'A14 Bionic Chip with Next Generation Neural Engine',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Camera System (Ultra Wide and Wide), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Night Mode, Deep Fusion, Optical Image Stabilisation, 2x Optical Zoom Out, Digital Zoom Upto 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom Out, Digital Zoom Upto 3x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
//               Flash:
//                 'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K, 1080P, HDR Video Recording with Dolby Vision Upto 30 fps',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
//               'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '476 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '64.2 mm',
//               Height: '131.5 mm',
//               Depth: '7.4 mm',
//               Weight: '133 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-12-pro',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 12 Pro',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements': 'Built‑in Stereo Speaker',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '15.49 cm (6.1 inch)',
//               Resolution: '2532 x 1170 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 6.1 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour, Haptic Touch, 2000000:1 Contrast Ratio (Typical), 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type':
//                 'A14 Bionic Chip with Next Generation Neural Engine',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Pro 12MP Camera System (Ultra Wide, Wide and Telephoto), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Telephoto: f/2.0 Aperture, Night Mode, Deep Fusion, Apple ProRAW, Dual Optical Image Stabilisation, 2x Optical Zoom in, 2x Optical Zoom Out, 4x Optical Zoom Range, Digital Zoom Upto 10x, Night Mode Portrait, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 60 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom In, 2x Optical Zoom Out, Digital Zoom Upto 6x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
//               Flash:
//                 'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K, 1080p, HDR Video Recording with Dolby Vision Upto 60 fps',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 10x, Video: Digital Zoom Upto 6x',
//               'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '460 PPI',
//               Sensors:
//                 'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '71.5 mm',
//               Height: '146.7 mm',
//               Depth: '7.4 mm',
//               Weight: '187 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-12-pro-max',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 12 Pro Max',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements': 'Built‑in Stereo Speaker',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '17.02 cm (6.7 inch)',
//               Resolution: '2778 x 1284 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 6.7 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour, Haptic Touch, 2000000:1 Contrast Ratio (Typical), 800 nits Max Brightness (Typical), 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type':
//                 'A14 Bionic Chip with Next Generation Neural Engine',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Pro 12MP Camera System (Ultra Wide, Wide and Telephoto), Ultra Wide: f/2.4 Aperture, Wide: f/1.6 Aperture, Telephoto: f/2.0 Aperture, Night Mode, Deep Fusion, Apple ProRAW, Dual Optical Image Stabilisation, 2x Optical Zoom in, 2x Optical Zoom Out, 4x Optical Zoom Range, Digital Zoom Upto 10x, Night Mode Portrait, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Smart HDR 3 for Photos, Video: 4K Video Recording at 24 fps, 30 fps or 60 fps, 1080p HD Video Recording at 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 60 fps, Extended Dynamic Range for Video Upto 60 fps, Optical Image Stabilisation for Video, 2x Optical Zoom In, 2x Optical Zoom Out, Digital Zoom Upto 6x, Audio Zoom, QuickTake Video, Slow-motion Video Support for 1080p at 120 fps or 240 fps, Night Mode Time-lapse, Time-lapse Video with Stabilisation, Stereo Recording',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 'TrueDepth Camera, 12MP Photos, f/2.2 Aperture, Smart HDR 3 for Photos, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High-Key Mono), Extended Dynamic Rnge for Video at 30 fps, Cinematic Video Stabilisation (4K, 1080p and 720p), 4K Video Recording at 24 fps, 30 fps or 60 fps, HDR Video Recording with Dolby Vision Upto 30 fps, 1080p HD Video Recording at 30 fps or 60 fps, Slow-motion Video Support for 1080p at 120 fps, Night Mode, Deep Fusion, QuickTake Video, Animoji and Memoji',
//               Flash:
//                 'Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K, 1080p, HDR Video Recording with Dolby Vision Upto 60 fps',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 10x, Video: Digital Zoom Upto 7x',
//               'Frame Rate': '24 fps, 30 fps, 60 fps, 120 fps, 240 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G LTE, WCDMA, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi‑Fi 6 (802.11ax) with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '458 PPI',
//               Sensors:
//                 'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant (Rated IP68 (Maximum Depth of 6 Metres Upto 30 Minutes) Under IEC Standard 60529), Ceramic Shield Front, Aerospace-grade Aluminium, Compatible with MagSafe Accessories and Wireless Chargers, Audio Playback: Spatial Audio Playback, Supports Dolby Atmos, Video Playback: HDR with Dolby Vision, HDR10 and HLG',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Audio Formats':
//                 'Audio Formats Supported: AAC‑LC, HE‑AAC, HE‑AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '78.1 mm',
//               Height: '160.8 mm',
//               Depth: '7.4 mm',
//               Weight: '226 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-13',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 13',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements':
//                 'Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '15.49 cm (6.1 inch)',
//               Resolution: '2532 x 1170 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 6.1‑inch (Diagonal) All‑screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 800 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A15 Bionic Chip',
//               'Processor Core': 'Hexa Core',
//               'Operating Frequency':
//                 '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Camera System (Wide and Ultra Wide), Wide: f/1.6 Aperture, Ultra Wide: f/2.4 Aperture, 120 Degree FOV, 2x Optical Zoom out, Digital Zoom up to 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Sensor-shift Optical Image Stabilisation (Wide), Seven‑element Lens (Wide), Five‑element Lens (Ultra Wide), Panorama (up to 63MP), Sapphire Crystal Lens Cover, 100% Focus Pixels (Wide), Night Mode Deep Fusion, Smart HDR 4, Photographic Styles, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Video Recording: Sensor-shift OIS for Video (Wide), Audio Zoom, QuickTake Video, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), Continuous AF Video, Playback Zoom, Stereo Recording',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
//               'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '460 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '71.5 mm',
//               Height: '146.7 mm',
//               Depth: '7.65 mm',
//               Weight: '173 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-13-mini',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 13 Mini',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements':
//                 'Dolby Digital (AC‑3), Dolby Digital Plus (E‑AC‑3), Dolby Atmos and Audible (formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '13.72 cm (5.4 inch)',
//               Resolution: '2340 x 1080 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 5.4‑inch (Diagonal) All‑screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 800 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A15 Bionic Chip',
//               'Processor Core': 'Hexa Core',
//               'Operating Frequency':
//                 '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP',
//               'Primary Camera Features':
//                 'Dual 12MP Camera System (Wide and Ultra Wide), Wide: f/1.6 Aperture, Ultra Wide: f/2.4 Aperture, 120 Degree FOV, 2x Optical Zoom out, Digital Zoom up to 5x, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Sensor-shift Optical Image Stabilisation (Wide), Seven‑element Lens (Wide), Five‑element Lens (Ultra Wide), Panorama (up to 63MP), Sapphire Crystal Lens Cover, 100% Focus Pixels (Wide), Night Mode Deep Fusion, Smart HDR 4, Photographic Styles, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Auto Image Stabilisation, Burst Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG, Video Recording: Sensor-shift OIS for Video (Wide), Audio Zoom, QuickTake Video, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), Continuous AF Video, Playback Zoom, Stereo Recording',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time‑lapse Video with Stabilisation, Night Mode Time-lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x',
//               'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2x2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '476 PPI',
//               Sensors:
//                 'Face ID, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '64.2 mm',
//               Height: '131.5 mm',
//               Depth: '7.65 mm',
//               Weight: '140 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-13-pro',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 13 Pro',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements':
//                 'Dolby Digital (AC-3), Dolby Digital Plus (E‑AC-3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '15.49 cm (6.1 inch)',
//               Resolution: '2532 x 1170 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 6.1‑inch (Diagonal) All‑screen OLED Display, ProMotion Technology with Adaptive Refresh Rates up to 120Hz, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 1000 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A15 Bionic Chip',
//               'Processor Core': 'Hexa Core',
//               'Operating Frequency':
//                 '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Pro 12MP Camera System (Telephoto, Wide and Ultra Wide), Telephoto: f/2.8 Aperture, Wide: f/1.5 Aperture, Ultra Wide: f/1.8 Aperture, 120 Degree FOV, 3x Optical Zoom In, 2x Optical Zoom out, 6x Optical Zoom Range, Digital Zoom up to 15x, Night Mode Portraits Enabled by LiDAR Scanner, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Dual Optical Image Stabilisation (Telephoto and Wide), Sensor‑shift Optical Image Stabilisation (Wide), Six‑element Lens (Telephoto and Ultra Wide), Seven‑element Lens (Wide), Panorama (up to 63MP), 100% Focus Pixels (Wide), Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Macro Photography, Apple ProRAW, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Apple ProRAW, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time-lapse Video with Stabilisation, Night Mode Time‑lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 15x, Video: Digital Zoom Upto 9x',
//               'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Call Features',
//             values: {
//               'Call Wait/Hold': 'Yes',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2 x 2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'ther Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '460 PPI',
//               Sensors:
//                 'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '71.5 mm',
//               Height: '146.7 mm',
//               Depth: '7.65 mm',
//               Weight: '203 g',
//             },
//           },
//         ],
//       },
//       {
//         productCode: 'apple-iphone-13-pro-max',
//         productSpecs: [
//           {
//             title: 'General',
//             values: {
//               'Model Name': 'iPhone 13 Pro Max',
//               'Browse Type': 'Smartphones',
//               'SIM Type': 'Dual Sim',
//               'Hybrid Sim Slot': 'No',
//               Touchscreen: 'Yes',
//               'OTG Compatible': 'No',
//               'Quick Charging': 'Yes',
//               'Sound Enhancements':
//                 'Dolby Digital (AC-3), Dolby Digital Plus (E‑AC-3), Dolby Atmos and Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX and AAX+), Spatial Audio Playback',
//             },
//           },
//           {
//             title: 'Display Features',
//             values: {
//               'Display Size': '17.02 cm (6.7 inch)',
//               Resolution: '2778 x 1284 Pixels',
//               'Resolution Type': 'Super Retina XDR Display',
//               'Display Type': 'Super Retina XDR Display',
//               'Other Display Features':
//                 'Super Retina XDR Display, 6.7‑inch (Diagonal) All‑screen OLED Display, ProMotion Technology with Adaptive Refresh Rates up to 120Hz, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 20,00,000:1 Contrast Ratio (Typical), 1000 nits max Brightness (Typical), 1,200 nits max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously',
//             },
//           },
//           {
//             title: 'Os & Processor Features',
//             values: {
//               'Processor Type': 'A15 Bionic Chip',
//               'Processor Core': 'Hexa Core',
//               'Operating Frequency':
//                 '2G GSM/EDGE: 850, 900, 1800, 1900 MHz, 3G UMTS/HSPA+/DC-HSDPA: 850, 900, 1700/2100, 1900, 2100 MHz, 4G TD-LTE: Bands 34, 38, 39, 40, 41, 42, 46, 48, 4G FDD-LTE: Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 66, 5G NR: Bands n1, n2, n3, n5, n7, n8, n12, n20, n25, n28, n30, n38, n40, n41, n48, n66, n77, n78, n79',
//             },
//           },
//           {
//             title: 'Camera Features',
//             values: {
//               'Primary Camera Available': 'Yes',
//               'Primary Camera': '12MP + 12MP + 12MP',
//               'Primary Camera Features':
//                 'Pro 12MP Camera System (Telephoto, Wide and Ultra Wide), Telephoto: f/2.8 Aperture, Wide: f/1.5 Aperture, Ultra Wide: f/1.8 Aperture, 120 Degree FOV, 3x Optical Zoom In, 2x Optical Zoom out, 6x Optical Zoom Range, Digital Zoom up to 15x, Night Mode Portraits Enabled by LiDAR Scanner, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Dual Optical Image Stabilisation (Telephoto and Wide), Sensor‑shift Optical Image Stabilisation (Wide), Six‑element Lens (Telephoto and Ultra Wide), Seven‑element Lens (Wide), Panorama (up to 63MP), 100% Focus Pixels (Wide), Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Macro Photography, Apple ProRAW, Wide Colour Capture for Photos and Live Photos, Lens Correction (Ultra Wide), Advanced Red‑eye Correction, Photo Geotagging, Auto Image Stabilisation, Burst Mode, Image Formats Captured: HEIF and JPEG',
//               'Secondary Camera Available': 'Yes',
//               'Secondary Camera': '12MP Front Camera',
//               'Secondary Camera Features':
//                 '12MP TrueDepth Camera, f/2.2 Aperture, Portrait Mode with Advanced Bokeh and Depth Control, Portrait Lighting with Six Effects (Natural, Studio, Contour, Stage, Stage Mono, High‑Key Mono), Animoji and Memoji, Night Mode, Deep Fusion, Smart HDR 4, Photographic Styles, Apple ProRAW, Cinematic Mode for Recording Videos with Shallow Depth of Field (1080p at 30 fps), HDR Video Recording with Dolby Vision up to 4K at 60 fps, Time-lapse Video with Stabilisation, Night Mode Time‑lapse, Cinematic Video Stabilisation (4K, 1080p and 720p), QuickTake Video, Wide Colour Capture for Photos and Live Photos, Lens Correction, Auto Image Stabilisation, Burst Mode',
//               Flash:
//                 'Rear: True Tone Flash with Slow Sync | Front: Retina Flash',
//               'HD Recording': 'Yes',
//               'Full HD Recording': 'Yes',
//               'Video Recording': 'Yes',
//               'Video Recording Resolution':
//                 '4K Video Recording (at 24 fps, 25 fps, 30 fps or 60 fps), 1080p HD Video Recording (at 25 fps, 30 fps or 60 fps), 720p HD Video Recording (at 30 fps), Slow‑motion Video Support: Rear Camera (1080p at 120 fps or 240 fps), Front Camera (1080p at 120 fps)',
//               'Digital Zoom':
//                 'Photo: Digital Zoom Upto 15x, Video: Digital Zoom Upto 9x',
//               'Frame Rate': '24 fps, 25 fps, 30 fps, 60 fps',
//               'Dual Camera Lens': 'Primary Camera',
//             },
//           },
//           {
//             title: 'Connectivity Features',
//             values: {
//               'Network Type': '5G, 4G, 3G, 2G',
//               'Supported Networks': '5G, 4G VoLTE, 4G LTE, UMTS, GSM',
//               'Internet Connectivity': '5G, 4G, 3G, Wi-Fi, EDGE',
//               '3G': 'Yes',
//               'Pre-installed Browser': 'Safari',
//               'Bluetooth Support': 'Yes',
//               'Bluetooth Version': 'v5.0',
//               'Wi-Fi': 'Yes',
//               'Wi-Fi Version': 'Wi-Fi 6 (802.11ax) with 2 x 2 MIMO',
//               'Wi-Fi Hotspot': 'Yes',
//               NFC: 'Yes',
//               EDGE: 'Yes',
//               'Map Support': 'Maps',
//               'GPS Support': 'Yes',
//             },
//           },
//           {
//             title: 'Other Details',
//             values: {
//               Smartphone: 'Yes',
//               'SIM Size': 'Nano + eSIM',
//               'Mobile Tracker': 'Yes',
//               'Removable Battery': 'No',
//               SMS: 'Yes',
//               'Graphics PPI': '458 PPI',
//               Sensors:
//                 'Face ID, LiDAR Scanner, Barometer, Three‑axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor',
//               Browser: 'Safari',
//               'Other Features':
//                 'Splash, Water and Dust Resistant IP68 Rated (Maximum Depth of 6 metres up to 30 minutes) under IEC Standard 60529, Face ID Enabled by TrueDepth Camera for Facial Recognition, Compatible with MagSafe Accessories and Wireless Chargers',
//               'GPS Type': 'Built-in GPS, GLONASS, Galileo, QZSS and BeiDou',
//             },
//           },
//           {
//             title: 'Multimedia Features',
//             values: {
//               'Video Formats':
//                 'HEVC, H.264, MPEG‑4 Part 2 and Motion JPEG, HDR with Dolby Vision, HDR10 and HLG',
//             },
//           },
//           {
//             title: 'Dimensions',
//             values: {
//               Width: '78.1 mm',
//               Height: '160.8 mm',
//               Depth: '7.65 mm',
//               Weight: '238 g',
//             },
//           },
//         ],
//       },
//     ]);
//   }