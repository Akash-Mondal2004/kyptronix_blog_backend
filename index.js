const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const { connect } = require('./db/db');

// Connect to MongoDB
connect.then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
// moongoose 

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/questionnaire', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on('connected', () => {
//   console.log('✅ Connected to MongoDB');
// });
// mongoose.connection.on('error', (err) => {
//   console.error('❌ MongoDB connection error:', err);
// });
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neel.kyptronix@gmail.com',
    pass: 'ownw hjel dllq nmyu'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Helper function to format SEO form data into HTML
const formatSEOFormDataToHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .section { background: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
        .section-title { color: #28a745; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { color: #333; margin-left: 10px; }
        .credentials-list { display: flex; flex-wrap: wrap; gap: 10px; margin-left: 10px; }
        .credential-tag { background: #28a745; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; }
        .metadata { background: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>� New SEO Questionnaire Submission</h1>
          <p>Submitted on: ${new Date(formData.submittedAt).toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">🏢 Basic Information</div>
          <div class="field"><span class="field-label">Company Name:</span><span class="field-value">${formData.company_name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Contact Person:</span><span class="field-value">${formData.contact_person || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Email:</span><span class="field-value">${formData.email || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Website URL:</span><span class="field-value">${formData.website || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Business Description:</span><span class="field-value">${formData.business || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Business Niche:</span><span class="field-value">${formData.niche || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Goals & Objectives</div>
          <div class="field"><span class="field-label">SEO Goals:</span><span class="field-value">${formData.seo_goal || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Target Monthly Visits:</span><span class="field-value">${formData.visit || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">KPIs to Track:</span><span class="field-value">${formData.kpi || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">👥 Target Audience & Market</div>
          <div class="field"><span class="field-label">Target Audience:</span><span class="field-value">${formData.target_audience || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Geographic Locations:</span><span class="field-value">${formData.location || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Primary Problems Solved:</span><span class="field-value">${formData.primary_problems || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🏆 Competitor Analysis</div>
          <div class="field"><span class="field-label">Competitors:</span><span class="field-value">${formData.competitors || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Benchmark Competitors:</span><span class="field-value">${formData.benchmark || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🔑 Keyword Information</div>
          <div class="field"><span class="field-label">Specific Keywords:</span><span class="field-value">${formData.specific_keyword || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Keyword Research Needed:</span><span class="field-value">${formData.keyword_research || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📊 Current SEO Situation</div>
          <div class="field"><span class="field-label">Previous SEO Work:</span><span class="field-value">${formData.seo_describe || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Content Strategy:</span><span class="field-value">${formData.content_strategy || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Known Issues:</span><span class="field-value">${formData.issue || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🌐 Website Details</div>
          <div class="field"><span class="field-label">Website Platform:</span><span class="field-value">${formData.web_platform || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Blog Section:</span><span class="field-value">${formData.blog_section || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">💰 Ads Budget & Paid Campaigns</div>
          <div class="field"><span class="field-label">Monthly Budget:</span><span class="field-value">${formData.monthly_budget || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Previous Paid Ads:</span><span class="field-value">${formData.paid_ad || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📝 Content & Backlink Preferences</div>
          <div class="field"><span class="field-label">Existing Content:</span><span class="field-value">${formData.exist_content || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Backlink Building:</span><span class="field-value">${formData.backlink || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">� Access & Credentials</div>
          <div class="field">
            <span class="field-label">Login Credentials:</span>
            <div class="credentials-list">
              ${formData.access_credentials && formData.access_credentials.length > 0 
                ? formData.access_credentials.map(credential => `<span class="credential-tag">${credential}</span>`).join('')
                : '<span class="field-value">None selected</span>'
              }
            </div>
          </div>
          <div class="field"><span class="field-label">Google Access Emails:</span><span class="field-value">${formData.google_access_emails || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📋 Additional Information</div>
          <div class="field"><span class="field-label">SEO Strategy:</span><span class="field-value">${formData.seo_strategy || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Website Restrictions:</span><span class="field-value">${formData.restriction || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Upcoming Events:</span><span class="field-value">${formData.event || 'Not provided'}</span></div>
        </div>

        <div class="metadata">
          <strong>Submission Details:</strong><br>
          Form Version: ${formData.formVersion || 'Unknown'}<br>
          User Agent: ${formData.userAgent || 'Unknown'}<br>
          Submitted At: ${formData.submittedAt}
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to format form data into HTML
const formatFormDataToHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .section { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
        .section-title { color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { color: #333; margin-left: 10px; }
        .features-list { display: flex; flex-wrap: wrap; gap: 10px; margin-left: 10px; }
        .feature-tag { background: #667eea; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; }
        .metadata { background: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Website Development Questionnaire Submission</h1>
          <p>Submitted on: ${new Date(formData.submittedAt).toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">🏢 Company Information</div>
          <div class="field"><span class="field-label">Company Name:</span><span class="field-value">${formData.company_name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Contact Person:</span><span class="field-value">${formData.contact_person || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Email:</span><span class="field-value">${formData.email || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Phone:</span><span class="field-value">${formData.phone || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Business Industry:</span><span class="field-value">${formData.business_industry || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Current Website:</span><span class="field-value">${formData.website || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Preferred Completion Date:</span><span class="field-value">${formData.completion_date || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Project Overview</div>
          <div class="field"><span class="field-label">Website Purpose:</span><span class="field-value">${formData.purpose_website || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">New/Redesign:</span><span class="field-value">${formData.redesign || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Primary Goals:</span><span class="field-value">${formData.goal || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Target Audience:</span><span class="field-value">${formData.target_audience || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">⚙️ Features and Functionality</div>
          <div class="field">
            <span class="field-label">Essential Features:</span>
            <div class="features-list">
              ${formData.features && formData.features.length > 0 
                ? formData.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')
                : '<span class="field-value">None selected</span>'
              }
            </div>
          </div>
          <div class="field"><span class="field-label">Special Features:</span><span class="field-value">${formData.special_feature || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">CMS Requirements:</span><span class="field-value">${formData.cms || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎨 Design and Branding</div>
          <div class="field"><span class="field-label">Existing Branding:</span><span class="field-value">${formData.exist_brand || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Website Examples:</span><span class="field-value">${formData.website_example || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Preferred Style:</span><span class="field-value">${formData.website_style || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Dislikes:</span><span class="field-value">${formData.dislike_color_style || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📝 Content</div>
          <div class="field"><span class="field-label">Content Provision:</span><span class="field-value">${formData.website_content || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Number of Pages:</span><span class="field-value">${formData.website_page || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">SEO Content:</span><span class="field-value">${formData.seo_content || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📈 SEO & Marketing</div>
          <div class="field"><span class="field-label">On-page SEO:</span><span class="field-value">${formData.on_page_seo || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Analytics:</span><span class="field-value">${formData.analytics || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Social Media Assistance:</span><span class="field-value">${formData.assistance || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🛒 E-commerce</div>
          <div class="field"><span class="field-label">Products/Services Online:</span><span class="field-value">${formData.product_sell_online || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Payment Gateway:</span><span class="field-value">${formData.payment_gateway || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">E-commerce Features:</span><span class="field-value">${formData.ecommerce_features || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🌐 Hosting and Domain</div>
          <div class="field"><span class="field-label">Domain Name:</span><span class="field-value">${formData.domain_name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Hosting Preferences:</span><span class="field-value">${formData.hosting || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Email for Domain:</span><span class="field-value">${formData.email_for_domain || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">💰 Budget and Timeline</div>
          <div class="field"><span class="field-label">Estimated Budget:</span><span class="field-value">${formData.estimate_budget || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Launch Date:</span><span class="field-value">${formData.specific_launch_date || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🔧 Maintenance and Support</div>
          <div class="field"><span class="field-label">Website Maintenance:</span><span class="field-value">${formData.website_maintenance || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Content Management Training:</span><span class="field-value">${formData.content_manage || 'Not provided'}</span></div>
        </div>

        ${formData.anything_else ? `
        <div class="section">
          <div class="section-title">📋 Additional Notes</div>
          <div class="field"><span class="field-value">${formData.anything_else}</span></div>
        </div>
        ` : ''}

        <div class="metadata">
          <strong>Submission Details:</strong><br>
          Form Version: ${formData.formVersion || 'Unknown'}<br>
          User Agent: ${formData.userAgent || 'Unknown'}<br>
          Submitted At: ${formData.submittedAt}
        </div>
      </div>
    </body>
    </html>
  `;
};

// API endpoint for questionnaire submission
app.post('/question', async (req, res) => {
  console.log('📨 New questionnaire submission received');
  console.log('📊 Form data:', req.body);

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.company_name || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: company_name, email, or phone'
      });
    }

    // Prepare email content
    const htmlContent = formatFormDataToHTML(formData);
    
    // Email configuration
    const mailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: ['neel.kyptronix@gmail.com', 'Kyptronix@gmail.com'],
      subject: `🚀 New Website Development Questionnaire - ${formData.company_name}`,
      html: htmlContent,
      replyTo: formData.email
    };

    // Send email
    console.log('📤 Sending email to recipients...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    console.log('📧 Recipients:', mailOptions.to);

    // Send confirmation email to the client (optional)
    const confirmationMailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: formData.email,
      subject: '✅ Thank you for your Website Development Questionnaire Submission',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 KYPTRONIX</h1>
              <h2>Thank You for Your Submission!</h2>
            </div>
            <div class="content">
              <p>Dear ${formData.contact_person || 'Valued Client'},</p>
              <p>Thank you for submitting your website development questionnaire. We have received your detailed requirements for <strong>${formData.company_name}</strong>.</p>
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>✅ Our team will review your requirements within 24 hours</li>
                <li>📋 We'll prepare a comprehensive proposal tailored to your needs</li>
                <li>📞 We'll contact you to discuss the next steps</li>
                <li>🎯 We'll provide you with a detailed timeline and cost estimate</li>
              </ul>
              <p>If you have any immediate questions or need to add additional information, please don't hesitate to contact us.</p>
              <p>Best regards,<br><strong>The KYPTRONIX Team</strong></p>
            </div>
            <div class="footer">
              <p>📧 Email: neel.kyptronix@gmail.com | 🌐 Website: kyptronix.us</p>
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send confirmation email
    try {
      await transporter.sendMail(confirmationMailOptions);
      console.log('✅ Confirmation email sent to client');
    } catch (confirmationError) {
      console.log('⚠️ Confirmation email failed, but main email was sent:', confirmationError.message);
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'Questionnaire submitted successfully! We will contact you within 24 hours.',
      submissionId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing questionnaire submission:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit questionnaire. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Helper function to format SMO form data into HTML
const formatSMOFormDataToHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .section { background: #f8f9fa; border-left: 4px solid #e91e63; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
        .section-title { color: #e91e63; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { color: #333; margin-left: 10px; }
        .metadata { background: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📱 New SMO Questionnaire Submission</h1>
          <p>Submitted on: ${new Date(formData.submittedAt).toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">🏢 Basic Information</div>
          <div class="field"><span class="field-label">Company Name:</span><span class="field-value">${formData.company_name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Website URL:</span><span class="field-value">${formData.website || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Industry/Niche:</span><span class="field-value">${formData.niche || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Target Market & Audience</div>
          <div class="field"><span class="field-label">Target Market:</span><span class="field-value">${formData.target_market || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Ideal Customers:</span><span class="field-value">${formData.ideal_customers || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Specific Audience Segments:</span><span class="field-value">${formData.specific_audience || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎯 Campaign Objectives</div>
          <div class="field"><span class="field-label">Primary Objective:</span><span class="field-value">${formData.primary_objective || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Target Visitors:</span><span class="field-value">${formData.visitor || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">KPIs:</span><span class="field-value">${formData.kpi || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📝 Content Preferences</div>
          <div class="field"><span class="field-label">Content That Resonates:</span><span class="field-value">${formData.content_resonates || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Specific Themes:</span><span class="field-value">${formData.specific_themes || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🏆 Competitor Analysis</div>
          <div class="field"><span class="field-label">Competitors:</span><span class="field-value">${formData.competitors || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Specific Strategies:</span><span class="field-value">${formData.specific_strategies || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">💰 Ads Budget</div>
          <div class="field"><span class="field-label">Monthly Budget:</span><span class="field-value">${formData.monthly_budget || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Influencer Marketing Budget:</span><span class="field-value">${formData.influencer_marketing || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Local Outreach Budget:</span><span class="field-value">${formData.budget_local_outreach || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">👑 Influencer Marketing</div>
          <div class="field"><span class="field-label">Specific Influencers:</span><span class="field-value">${formData.specific_influencers || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Influencer Type:</span><span class="field-value">${formData.influencer_type || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Platform:</span><span class="field-value">${formData.platform || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🏠 Local Outreach</div>
          <div class="field"><span class="field-label">Activity:</span><span class="field-value">${formData.activity || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Local Ambassador:</span><span class="field-value">${formData.local_ambassador || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📱 Social Media Presence</div>
          <div class="field"><span class="field-label">Social Media Platforms:</span><span class="field-value">${formData.social_media_platform || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Other Platforms:</span><span class="field-value">${formData.other_platform || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🔐 Access & Credentials</div>
          <div class="field"><span class="field-label">Login Credentials:</span><span class="field-value">${formData.login_credentials || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Third Party Tools:</span><span class="field-value">${formData.third_party_tools || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🎨 Brand Guidelines</div>
          <div class="field"><span class="field-label">Brand Guidelines:</span><span class="field-value">${formData.brand_guidelines || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Specific Dos/Don'ts:</span><span class="field-value">${formData.specific_dos_donts || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📋 Additional Notes</div>
          <div class="field"><span class="field-label">Existing Campaigns:</span><span class="field-value">${formData.existing_campaign || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Preferences:</span><span class="field-value">${formData.preference || 'Not provided'}</span></div>
        </div>

        <div class="metadata">
          <strong>Submission Details:</strong><br>
          Form Version: ${formData.formVersion || 'Unknown'}<br>
          User Agent: ${formData.userAgent || 'Unknown'}<br>
          Submitted At: ${formData.submittedAt}
        </div>
      </div>
    </body>
    </html>
  `;
};

// API endpoint for SEO questionnaire submission
app.post('/seo-question', async (req, res) => {
  console.log('📨 New SEO questionnaire submission received');
  console.log('📊 SEO Form data:', req.body);

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.company_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: company_name'
      });
    }

    // Prepare email content
    const htmlContent = formatSEOFormDataToHTML(formData);
    
    // Email configuration
    const mailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: ['neel.kyptronix@gmail.com', 'Kyptronix@gmail.com'],
      subject: `🔍 New SEO Questionnaire - ${formData.company_name}`,
      html: htmlContent,
      replyTo: formData.email || 'noreply@example.com'
    };

    // Send email
    console.log('📤 Sending SEO email to recipients...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ SEO Email sent successfully:', info.messageId);
    console.log('📧 Recipients:', mailOptions.to);

    // Send confirmation email to the client (if email provided)
    if (formData.email) {
      const confirmationMailOptions = {
        from: 'neel.kyptronix@gmail.com',
        to: formData.email,
        subject: '✅ Thank you for your SEO Questionnaire Submission',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
              .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔍 KYPTRONIX SEO Services</h1>
                <h2>Thank You for Your SEO Questionnaire!</h2>
              </div>
              <div class="content">
                <p>Dear ${formData.contact_person || 'Valued Client'},</p>
                <p>Thank you for submitting your SEO questionnaire. We have received your detailed requirements for <strong>${formData.company_name}</strong>.</p>
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>🔍 Our SEO team will analyze your current website and requirements</li>
                  <li>📋 We'll prepare a comprehensive SEO strategy proposal</li>
                  <li>📞 We'll contact you to discuss the SEO roadmap</li>
                  <li>🎯 We'll provide you with a detailed SEO plan and timeline</li>
                </ul>
                <p>If you have any immediate questions about SEO or need to add additional information, please don't hesitate to contact us.</p>
                <p>Best regards,<br><strong>The KYPTRONIX SEO Team</strong></p>
              </div>
              <div class="footer">
                <p>📧 Email: neel.kyptronix@gmail.com | 🌐 Website: kyptronix.us</p>
                <p>This is an automated confirmation email. Please do not reply to this message.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send confirmation email
      try {
        await transporter.sendMail(confirmationMailOptions);
        console.log('✅ SEO Confirmation email sent to client');
      } catch (confirmationError) {
        console.log('⚠️ SEO Confirmation email failed, but main email was sent:', confirmationError.message);
      }
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'SEO questionnaire submitted successfully! We will contact you within 24 hours with an SEO strategy proposal.',
      submissionId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing SEO questionnaire submission:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit SEO questionnaire. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// API endpoint for SMO questionnaire submission
app.post('/smo-question', async (req, res) => {
  console.log('📨 New SMO questionnaire submission received');
  console.log('📊 SMO Form data:', req.body);

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.company_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: company_name'
      });
    }

    // Prepare email content
    const htmlContent = formatSMOFormDataToHTML(formData);
    
    // Email configuration
    const mailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: ['neel.kyptronix@gmail.com', 'Kyptronix@gmail.com'],
      subject: `📱 New SMO Questionnaire - ${formData.company_name}`,
      html: htmlContent,
      replyTo: formData.email || 'noreply@example.com'
    };

    // Send email
    console.log('📤 Sending SMO email to recipients...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ SMO Email sent successfully:', info.messageId);
    console.log('📧 Recipients:', mailOptions.to);

    // Send confirmation email to the client (if email provided)
    if (formData.email) {
      const confirmationMailOptions = {
        from: 'neel.kyptronix@gmail.com',
        to: formData.email,
        subject: '✅ Thank you for your SMO Questionnaire Submission',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
              .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📱 KYPTRONIX SMO Services</h1>
                <h2>Thank You for Your SMO Questionnaire!</h2>
              </div>
              <div class="content">
                <p>Dear ${formData.contact_person || 'Valued Client'},</p>
                <p>Thank you for submitting your Social Media Optimization questionnaire. We have received your detailed requirements for <strong>${formData.company_name}</strong>.</p>
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>📱 Our SMO team will analyze your social media requirements</li>
                  <li>📋 We'll prepare a comprehensive social media strategy</li>
                  <li>📞 We'll contact you to discuss the SMO roadmap</li>
                  <li>🎯 We'll provide you with a detailed social media plan and content calendar</li>
                </ul>
                <p>If you have any immediate questions about social media marketing or need to add additional information, please don't hesitate to contact us.</p>
                <p>Best regards,<br><strong>The KYPTRONIX SMO Team</strong></p>
              </div>
              <div class="footer">
                <p>📧 Email: neel.kyptronix@gmail.com | 🌐 Website: kyptronix.us</p>
                <p>This is an automated confirmation email. Please do not reply to this message.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send confirmation email
      try {
        await transporter.sendMail(confirmationMailOptions);
        console.log('✅ SMO Confirmation email sent to client');
      } catch (confirmationError) {
        console.log('⚠️ SMO Confirmation email failed, but main email was sent:', confirmationError.message);
      }
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'SMO questionnaire submitted successfully! We will contact you within 24 hours with a social media strategy proposal.',
      submissionId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing SMO questionnaire submission:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit SMO questionnaire. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Helper function to format contact form data into HTML
const formatContactFormDataToHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .section { background: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
        .section-title { color: #007bff; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { color: #333; margin-left: 10px; }
        .message-content { background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; margin-top: 10px; }
        .metadata { background: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>Submitted on: ${new Date(formData.submittedAt).toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">👤 Contact Information</div>
          <div class="field"><span class="field-label">Name:</span><span class="field-value">${formData.name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Email:</span><span class="field-value">${formData.email || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Subject:</span><span class="field-value">${formData.subject || 'Not provided'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">💬 Message</div>
          <div class="message-content">
            ${formData.message ? formData.message.replace(/\n/g, '<br>') : 'No message provided'}
          </div>
        </div>

        <div class="metadata">
          <strong>Submission Details:</strong><br>
          Form Version: ${formData.formVersion || 'Contact Form v1.0'}<br>
          User Agent: ${formData.userAgent || 'Unknown'}<br>
          Submitted At: ${formData.submittedAt}
        </div>
      </div>
    </body>
    </html>
  `;
};

// API endpoint for contact form submission
app.post('/contact', async (req, res) => {
  console.log('📨 New contact form submission received');
  console.log('📊 Contact form data:', req.body);

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, subject, or message'
      });
    }

    // Validate captcha (2 + 2 = 4)
    if (formData.captcha !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Invalid captcha answer. Please solve the math problem correctly.'
      });
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString();
    formData.userAgent = req.headers['user-agent'];

    // Prepare email content
    const htmlContent = formatContactFormDataToHTML(formData);
    
    // Email configuration for KYPTRONIX team
    const mailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: 'Kyptronix@gmail.com',
      subject: `📧 New Contact Form Submission - ${formData.subject}`,
      html: htmlContent,
      replyTo: formData.email
    };

    // Send email to KYPTRONIX team
    console.log('📤 Sending contact form email to KYPTRONIX...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Contact form email sent successfully:', info.messageId);
    console.log('📧 Recipient: Kyptronix@gmail.com');

    // Send confirmation email to the client
    const confirmationMailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: formData.email,
      subject: '✅ Thank you for contacting KYPTRONIX',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .message-summary { background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 KYPTRONIX</h1>
              <h2>Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
              <p>Dear ${formData.name},</p>
              <p>Thank you for reaching out to us! We have received your message and our team will get back to you as soon as possible.</p>
              
              <div class="message-summary">
                <h4>Your Message Summary:</h4>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
              </div>

              <p><strong>What happens next?</strong></p>
              <ul>
                <li>✅ Our team will review your message within 24 hours</li>
                <li>📞 We'll contact you using the email address you provided</li>
                <li>💼 We'll provide you with the information or assistance you need</li>
                <li>🎯 We'll work together to find the best solution for your requirements</li>
              </ul>
              
              <p>If you have any immediate questions or need urgent assistance, please don't hesitate to call us at <strong>(302) 219-6889</strong>.</p>
              
              <p>Best regards,<br><strong>The KYPTRONIX Team</strong></p>
            </div>
            <div class="footer">
              <p>📧 Email: Info@kyptronix.com | 📞 Phone: (302) 219-6889 | 🌐 Website: kyptronix.us</p>
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send confirmation email
    try {
      await transporter.sendMail(confirmationMailOptions);
      console.log('✅ Contact form confirmation email sent to client');
    } catch (confirmationError) {
      console.log('⚠️ Contact form confirmation email failed, but main email was sent:', confirmationError.message);
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
      submissionId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing contact form submission:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Helper function to format download request data into HTML
const formatDownloadRequestDataToHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .section { background: #f8f9fa; border-left: 4px solid #ff6b35; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
        .section-title { color: #ff6b35; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { color: #333; margin-left: 10px; }
        .download-type { background: #ff6b35; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
        .metadata { background: #e9ecef; padding: 10px; border-radius: 4px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📥 New Download Request</h1>
          <p>Submitted on: ${new Date(formData.submittedAt).toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">📋 Download Details</div>
          <div class="download-type">
            ${formData.downloadType === 'company-profile' ? '🏢 Company Profile' : '💼 Business Card'} Download
          </div>
          <div class="field"><span class="field-label">Document Type:</span><span class="field-value">${formData.downloadType === 'company-profile' ? 'Company Profile PDF' : 'Business Card PDF'}</span></div>
        </div>

        <div class="section">
          <div class="section-title">👤 User Information</div>
          <div class="field"><span class="field-label">Full Name:</span><span class="field-value">${formData.name || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Email:</span><span class="field-value">${formData.email || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Phone Number:</span><span class="field-value">${formData.phone || 'Not provided'}</span></div>
          <div class="field"><span class="field-label">Company Name:</span><span class="field-value">${formData.company || 'Not provided'}</span></div>
        </div>

        <div class="metadata">
          <strong>Request Details:</strong><br>
          Form Version: ${formData.formVersion || 'Download Form v1.0'}<br>
          User Agent: ${formData.userAgent || 'Unknown'}<br>
          Submitted At: ${formData.submittedAt}
        </div>
      </div>
    </body>
    </html>
  `;
};

// API endpoint for download request submission
app.post('/download-request', async (req, res) => {
  console.log('📥 New download request received');
  console.log('📊 Download request data:', req.body);

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.downloadType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, or downloadType'
      });
    }

    // Validate download type
    if (!['company-profile', 'business-card'].includes(formData.downloadType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid download type. Must be either "company-profile" or "business-card"'
      });
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString();
    formData.userAgent = req.headers['user-agent'];

    // Prepare email content
    const htmlContent = formatDownloadRequestDataToHTML(formData);
    
    // Email configuration for KYPTRONIX team
    const downloadTypeLabel = formData.downloadType === 'company-profile' ? 'Company Profile' : 'Business Card';
    const mailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: 'Kyptronix@gmail.com',
      subject: `📥 New ${downloadTypeLabel} Download Request - ${formData.name}`,
      html: htmlContent,
      replyTo: formData.email
    };

    // Send email to KYPTRONIX team
    console.log(`📤 Sending ${downloadTypeLabel} download request email to KYPTRONIX...`);
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Download request email sent successfully:', info.messageId);
    console.log('📧 Recipient: Kyptronix@gmail.com');

    // Send confirmation email to the client
    const confirmationMailOptions = {
      from: 'neel.kyptronix@gmail.com',
      to: formData.email,
      subject: `✅ Thank you for downloading KYPTRONIX ${downloadTypeLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .download-info { background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; margin: 15px 0; }
            .cta-section { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📥 KRYPTRONIX</h1>
              <h2>Thank You for Your Interest!</h2>
            </div>
            <div class="content">
              <p>Dear ${formData.name},</p>
              <p>Thank you for downloading our <strong>${downloadTypeLabel}</strong>! We're excited to share more about KYPTRONIX and how we can help transform your business.</p>
              
              <div class="download-info">
                <h4>Download Information:</h4>
                <p><strong>Document:</strong> ${downloadTypeLabel}</p>
                <p><strong>Download Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Status:</strong> Successfully processed</p>
              </div>

              <div class="cta-section">
                <h3>🚀 Ready to Get Started?</h3>
                <p>Let's discuss how KYPTRONIX can accelerate your digital transformation!</p>
                <p><strong>📞 Call us:</strong> (302) 219-6889</p>
                <p><strong>📧 Email us:</strong> Info@kyptronix.us</p>
              </div>

              <p><strong>What's Next?</strong></p>
              <ul>
                <li>🔍 Review our capabilities and services</li>
                <li>💼 Explore how we can help your business grow</li>
                <li>📞 Schedule a free consultation with our team</li>
                <li>🎯 Get a custom quote for your project</li>
              </ul>
              
              <p>If you have any questions or would like to discuss your project requirements, don't hesitate to reach out to us!</p>
              
              <p>Best regards,<br><strong>The KYPTRONIX Team</strong></p>
            </div>
            <div class="footer">
              <p>📧 Email: Info@kyptronix.us | 📞 Phone: (302) 219-6889 | 🌐 Website: kyptronix.us</p>
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send confirmation email
    try {
      await transporter.sendMail(confirmationMailOptions);
      console.log('✅ Download request confirmation email sent to client');
    } catch (confirmationError) {
      console.log('⚠️ Download request confirmation email failed, but main email was sent:', confirmationError.message);
    }

    // Success response
    res.status(200).json({
      success: true,
      message: `Thank you for your interest! Your ${downloadTypeLabel} download has been processed successfully.`,
      submissionId: info.messageId,
      downloadType: formData.downloadType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing download request:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to process your download request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Questionnaire API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      'website-questionnaire': 'POST /question',
      'seo-questionnaire': 'POST /seo-question',
      'smo-questionnaire': 'POST /smo-question',
      'contact-form': 'POST /contact',
      'download-request': 'POST /download-request',
      'health': 'GET /health'
    }
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: {
      'website-questionnaire': 'POST /question',
      'seo-questionnaire': 'POST /seo-question',
      'smo-questionnaire': 'POST /smo-question',
      'contact-form': 'POST /contact',
      'download-request': 'POST /download-request',
      'health': 'GET /health'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 Questionnaire API Server started');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📋 Submit questionnaire: POST http://localhost:${PORT}/question`);
  console.log(`� Submit SEO questionnaire: POST http://localhost:${PORT}/seo-question`);
  console.log(`📱 Submit SMO questionnaire: POST http://localhost:${PORT}/smo-question`);
  console.log(`📧 Submit contact form: POST http://localhost:${PORT}/contact`);
  console.log(`�💊 Health check: GET http://localhost:${PORT}/health`);
  console.log('📧 Email recipients: neel.kyptronix@gmail.com, Kyptronix@gmail.com');
  console.log('✅ Ready to receive submissions!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Received SIGINT, shutting down gracefully');
  process.exit(0);
});



