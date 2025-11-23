# Portfolio Setup Guide

## Quick Start

1. **Open the Portfolio**
   - Simply open `index.html` in any modern web browser
   - No server required - works directly from file system

2. **Upload Your Profile Photo**
   - Hover over the profile photo in the hero section
   - Click "Upload Photo" 
   - Select your image (JPG, PNG, or WebP)
   - The photo will be saved automatically

3. **Upload Your Resume**
   - Scroll to the Resume section
   - Click "Upload Resume" button
   - Select your PDF file
   - The resume will preview and be available for download

## File Structure

```
portfolio/
├── index.html          # Main website file
├── style.css           # All styling (pastel theme)
├── script.js           # Animations & upload functionality
├── assets/             # Images and files folder
│   └── (your files go here)
├── README.md           # Documentation
└── SETUP.md           # This file
```

## Customization

### Update Personal Information
Edit `index.html` to change:
- Name and subtitle (Hero section)
- About section text
- Education details
- Skills and percentages
- Projects
- Certificates
- Participation details
- Contact information

### Change Colors
Edit CSS variables in `style.css` (lines 4-30):
```css
:root {
    --lavender: #E6D6FF;      /* Change to your preferred color */
    --peach: #FFE5D9;         /* Change to your preferred color */
    --powder-blue: #D6E5FF;   /* Change to your preferred color */
}
```

### Adjust Skill Percentages
In `index.html`, find the Skills section and update:
- `data-progress` attribute (the percentage)
- The text in `.progress-percent` span

## Features

✅ **Profile Photo Upload** - Click to upload, saved in browser
✅ **Resume PDF Upload** - Preview and download functionality
✅ **Smooth Animations** - Fade and slide effects
✅ **Progress Bars** - Animated skill progress indicators
✅ **Responsive Design** - Works on all devices
✅ **Glass Effects** - Modern frosted glass card design
✅ **Pastel Theme** - Soft, elegant color palette

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Notes

- All uploads are saved in browser localStorage
- No backend server required
- Works offline after initial load
- All animations are optimized for performance

## Troubleshooting

**Profile photo not showing?**
- Make sure you've uploaded an image
- Check browser console for errors
- Try a different image format (JPG recommended)

**Resume not previewing?**
- Ensure the file is a PDF
- Check browser PDF viewer support
- Try a different PDF file

**Animations not working?**
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try a different browser

---

Enjoy your beautiful portfolio! 🎨
