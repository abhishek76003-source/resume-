# Deployment Guide - Vardaan Clinic Website

## Quick Deployment Instructions

### Option 1: Hostinger (Recommended)

1. **Login to Hostinger Control Panel**
   - Go to hpanel.hostinger.com
   - Login with your credentials

2. **Access File Manager**
   - Click on "File Manager" in your hosting panel
   - Navigate to `public_html` directory

3. **Upload Files**
   - Upload all 4 files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
   - Ensure files are in the root of `public_html`

4. **Set Permissions**
   - Right-click on `index.html`
   - Set permissions to 644
   - Repeat for all files

5. **Test Your Site**
   - Visit your domain (e.g., `yourdomain.com`)
   - The website should load immediately

### Option 2: cPanel Hosting

1. **Login to cPanel**
   - Access your hosting cPanel

2. **File Manager**
   - Open File Manager
   - Go to `public_html` or `www` folder

3. **Upload**
   - Click Upload
   - Select all 4 files
   - Wait for upload to complete

4. **Access Website**
   - Visit your domain

### Option 3: Netlify (Free)

1. **Create Account**
   - Go to netlify.com
   - Sign up for free

2. **Deploy**
   - Drag and drop the entire project folder
   - OR connect GitHub repository
   - Netlify will auto-deploy

3. **Custom Domain** (Optional)
   - Go to Domain Settings
   - Add your custom domain
   - Update DNS records as instructed

### Option 4: GitHub Pages (Free)

1. **Push to GitHub**
   - Already done! ✅

2. **Enable Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select branch: `copilot/create-medical-clinic-website`
   - Click Save

3. **Access Site**
   - Visit: `username.github.io/resume-`

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All images display (or show placeholders)
- [ ] Mobile menu works on phones
- [ ] WhatsApp button opens WhatsApp
- [ ] Phone numbers are clickable on mobile
- [ ] Appointment form submits to WhatsApp
- [ ] Google Maps loads and shows correct location
- [ ] All sections scroll smoothly
- [ ] Responsive on all devices

## Customization After Deployment

### Replace Placeholder Images

The website uses placeholder images from Unsplash. Replace with actual photos:

1. Take professional photos of:
   - Dr. Arjit Gupta (headshot)
   - Clinic interior/exterior
   - Medical equipment

2. Upload images to your hosting

3. Update image URLs in `index.html`:
   - Line 131: Hero doctor image
   - Line 150: About section image

### Update Google Maps

If the embedded map doesn't show the exact location:

1. Go to Google Maps
2. Search for: "9, Khedapati Apartment, Railway Crossing, Gwalior"
3. Click Share → Embed a map
4. Copy the iframe code
5. Replace the iframe in `index.html` (line 432)

### Add Social Media Links

Update footer social links (lines 580-583):

```html
<a href="https://facebook.com/yourpage" class="social-link">
<a href="https://twitter.com/yourhandle" class="social-link">
<a href="https://instagram.com/yourprofile" class="social-link">
<a href="https://linkedin.com/in/yourprofile" class="social-link">
```

## Domain Setup

### If Using Custom Domain:

1. **Purchase Domain**
   - Buy from Hostinger, GoDaddy, or Namecheap

2. **Point to Hosting**
   - Update A record to hosting IP
   - Update Nameservers if needed

3. **SSL Certificate**
   - Most hosts provide free SSL
   - Enable in hosting panel
   - Website will use HTTPS

## Support

For technical issues:
- WhatsApp: +91 9479881390
- Check README.md for detailed documentation

## Maintenance

### Regular Updates:
- Keep clinic hours current
- Update services as needed
- Add new achievements
- Refresh images periodically

### Performance:
- Monitor loading speed
- Optimize images if needed
- Check mobile responsiveness regularly

---

**Website is live and ready to receive patients! 🏥**
