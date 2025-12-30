# System Architecture & Data Flow Diagrams

## 1. Component Architecture

```
Registration Page (/register)
│
├── Layout Background Effects
│   ├── Purple gradient blur
│   └── Blue gradient blur
│
├── Page Header
│   ├── Back to Home Link
│   ├── Title & Description
│   └── Form Container Glow
│
└── RegistrationForm Component
    ├── State Management
    │   ├── formData (user inputs)
    │   ├── teamMembers (team data)
    │   ├── moduleRegistrationCounts (Valorant count)
    │   ├── loadingCounts (API loading state)
    │   └── Other states (email errors, etc.)
    │
    ├── Effects
    │   ├── useEffect - Fetch Valorant count on mount
    │   ├── setInterval - Auto-refresh every 30s
    │   └── Math problem generation
    │
    ├── Form Sections
    │   ├── Personal Information
    │   │   ├── Full Name
    │   │   ├── Email
    │   │   ├── CNIC
    │   │   ├── Phone
    │   │   ├── University
    │   │   └── Roll Number
    │   │
    │   ├── Module Selection ⭐ (UPDATED)
    │   │   ├── Dropdown Menu
    │   │   │   └── Filters out Valorant when count >= 15
    │   │   ├── Shows count display
    │   │   ├── Warning message (when full)
    │   │   └── Team Name input
    │   │
    │   ├── Module Details Display
    │   │   ├── Module Info Cards
    │   │   ├── Team Size & Contact
    │   │   └── Prize Information
    │   │
    │   ├── Team Members Section
    │   │   ├── Add Member Button
    │   │   └── Member Forms
    │   │
    │   ├── Payment Details
    │   │   ├── Amount Display
    │   │   ├── Bank Details Button
    │   │   └── Receipt Upload
    │   │
    │   └── Security Verification
    │       ├── Math Problem
    │       └── Answer Input
    │
    └── Submit Button
        └── Triggers Validation & API Call
```

## 2. Data Flow - Valorant Registration Check

```
┌─────────────────────────────────────────────┐
│  User Opens Registration Form (/register)   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Component Mounts    │
        │  (RegistrationForm)  │
        └──────────┬───────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │  useEffect Triggers              │
    │  (on component mount)            │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  Fetch API:                          │
    │  /api/module-registration-count      │
    │  ?module=Valorant                    │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌─────────────────────────────────────────┐
    │  Backend: app/api/module-registration   │
    │           -count/route.ts               │
    │  ┌─────────────────────────────────┐   │
    │  │ Extract module param: 'Valorant' │   │
    │  └────────────┬────────────────────┘   │
    │               │                         │
    │               ▼                         │
    │  ┌─────────────────────────────────┐   │
    │  │ Supabase Query:                 │   │
    │  │ SELECT COUNT(*)                 │   │
    │  │ FROM registrations              │   │
    │  │ WHERE module='Valorant'         │   │
    │  │ AND status='approved'           │   │
    │  └────────────┬────────────────────┘   │
    │               │                         │
    │               ▼                         │
    │  ┌─────────────────────────────────┐   │
    │  │ Database Returns Count          │   │
    │  │ Example: 12                     │   │
    │  └────────────┬────────────────────┘   │
    │               │                         │
    │               ▼                         │
    │  ┌─────────────────────────────────┐   │
    │  │ Return JSON Response:           │   │
    │  │ {                               │   │
    │  │   module: 'Valorant',           │   │
    │  │   count: 12,                    │   │
    │  │   isLimitReached: false         │   │
    │  │ }                               │   │
    │  └────────────┬────────────────────┘   │
    └─────────────────┬────────────────────┘
                      │
                      ▼
        ┌──────────────────────────────┐
        │  Frontend Receives Response   │
        └──────────┬───────────────────┘
                   │
                   ▼
    ┌─────────────────────────────────────┐
    │ Update State:                       │
    │ moduleRegistrationCounts['Valorant']=12│
    └──────────┬────────────────────────┘
               │
               ▼
    ┌─────────────────────────────────────┐
    │ Component Re-renders                │
    └──────────┬────────────────────────┘
               │
               ▼
    ┌─────────────────────────────────────┐
    │ Module Dropdown Filtering:          │
    │ ✅ Show other modules               │
    │ ✅ Show Valorant (count < 15)       │
    │ ✅ Hide Valorant (count >= 15)      │
    │ ✅ Display count: "Valorant (12/15)"│
    └─────────────────────────────────────┘
```

## 3. Form Submission Flow - Valorant Limit Check

```
┌──────────────────────────────┐
│  User Clicks Submit Button   │
└──────────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────────────┐
    │  handleSubmit Function Triggered │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 1: Valorant Limit             │
    │  ┌────────────────────────────────┐  │
    │  │ if (formData.module === 'Valorant' &&
    │  │     moduleRegistrationCounts['Valorant'] >= 15)
    │  └────────────┬───────────────────┘  │
    │               │                      │
    │    YES ◄──────┴──────────┐           │
    │     │                    │           │
    │     ▼                    ▼           │
    │  ┌──────────┐      ┌─────────────┐  │
    │  │  REJECT  │      │  CONTINUE   │  │
    │  │ Show Alert       │  Validation │  │
    │  │ Return           └─────────────┘  │
    │  └──────────┘                        │
    └─────────────────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 2: Required Fields Present    │
    │  ✅ Name, Email, CNIC, Phone,        │
    │     University, Roll No, Module,     │
    │     Team Name, Payment Receipt       │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 3: Email Validation           │
    │  ✅ Valid format                     │
    │  ✅ Not disposable                   │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 4: Team Member Validation     │
    │  ✅ All fields present                │
    │  ✅ Valid emails                     │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 5: Math Problem Verification │
    │  ✅ Correct answer provided          │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  CHECK 6: Team Size Validation       │
    │  ✅ Doesn't exceed module max        │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  All Checks Passed ✅                │
    │  Proceed to API Call                 │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  POST /api/register                  │
    │  With all form data & payment receipt│
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  Server Processes Registration       │
    │  ✅ Validates email                  │
    │  ✅ Saves to database                │
    │  ✅ Sends confirmation email         │
    │  ✅ Generates access code            │
    └──────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────────────────────┐
    │  Show Success Modal                  │
    │  Display codes & redirect to home    │
    └──────────────────────────────────────┘
```

## 4. Auto-Refresh Mechanism

```
┌─────────────────────────────────────┐
│  Component Mount                    │
│  (useEffect runs)                   │
└──────────────┬──────────────────────┘
               │
               ▼
        ┌───────────────────────┐
        │  Fetch Count (Initial)│
        └───────────┬───────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │  Set Interval:         │
        │  Every 30 seconds      │
        │  (30,000 ms)           │
        └────────────┬───────────┘
                     │
      ┌──────────────┼──────────────┐
      │              │              │
      ▼              ▼              ▼
   30s          60s               90s
   └─►Fetch     └─►Fetch         └─►Fetch
       Count       Count           Count
       │            │               │
       ▼            ▼               ▼
    Update      Update           Update
    State       State            State
      │            │               │
      └────────────┴───────────────┴───► Keep Running
                                         Until Component
                                         Unmounts

┌─────────────────────────────────────┐
│  Component Unmount                  │
│  (useEffect cleanup)                │
└──────────────┬──────────────────────┘
               │
               ▼
        ┌──────────────────────┐
        │  Clear Interval      │
        │  Stop Auto-refresh   │
        └──────────────────────┘
```

## 5. State Management Tree

```
RegistrationForm Component
│
├── formData (FormData Object)
│   ├── name: string
│   ├── email: string
│   ├── cnic: string
│   ├── phone: string
│   ├── university: string
│   ├── rollNo: string
│   ├── module: string           ◄── Selected module
│   ├── hostel: string
│   ├── ambassadorCode: string
│   ├── teamName: string
│   └── paymentReceipt: File
│
├── teamMembers (TeamMember[])
│   └── [{ name, email, university, rollNo, cnic }]
│
├── moduleRegistrationCounts ⭐ (NEW)
│   └── { 'Valorant': 12 }       ◄── Valorant count
│
├── loadingCounts ⭐ (NEW)
│   └── boolean                   ◄── API loading state
│
├── loading: boolean
├── teamLimitError: string
├── showBankDetails: boolean
├── teamNameError: string
├── emailErrors: { [key]: string }
├── showConfirmationModal: boolean
├── registrationCodes: { accessCode, uniqueId }
├── mathProblem: { question, answer }
├── mathAnswer: string
└── mathError: string
```

## 6. Validation Layer

```
┌─────────────────────────────────────┐
│  Form Submission Initiated          │
└──────────────┬──────────────────────┘
               │
    ┌──────────┴───────────────────────┐
    │                                  │
    ▼                                  ▼
┌────────────────────────┐    ┌────────────────────────┐
│ FRONTEND VALIDATION    │    │ BACKEND VALIDATION     │
│ (Client-side)          │    │ (Server-side)          │
├────────────────────────┤    ├────────────────────────┤
│ ✅ Required fields     │    │ ✅ Email validation    │
│ ✅ Email format        │    │ ✅ Duplicate check     │
│ ✅ Disposable email    │    │ ✅ CNIC validation     │
│ ✅ Team size limit     │    │ ✅ File upload check   │
│ ✅ Math problem        │    │ ✅ Data sanitation     │
│ ✅ Valorant limit ⭐   │    │ ✅ Rate limiting       │
│    (count >= 15)       │    │ ✅ Fraud detection     │
└────────────┬───────────┘    └────────┬───────────────┘
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
                   ┌───────────────┐
                   │ All Valid? ✅  │
                   └───────┬───────┘
                           │
                           ▼
                 ┌──────────────────────┐
                 │ Save to Database     │
                 │ Send Confirmation    │
                 │ Return Codes         │
                 └──────────────────────┘
```

## 7. UI State Diagram - Module Selection

```
┌─────────────────────────────────────────┐
│         Module Selection UI             │
└──────────────────┬──────────────────────┘
                   │
         ┌─────────┴────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌────────────────────┐
│ Dropdown Open   │  │ Warning Message    │
├─────────────────┤  ├────────────────────┤
│ Show all        │  │ Hidden by default  │
│ available       │  │ Shown when:        │
│ modules         │  │ - Count >= 15      │
│                 │  │ - Red background   │
│ Valorant:       │  │ - Alert icon       │
│ - If count < 15:│  │ - "Valorant is    │
│   "Valorant     │  │   full (15/15)"   │
│    (12/15)..."  │  │                    │
│                 │  │ Visual:            │
│ - If count >= 15│  │ ┌──────────────────┤
│   HIDDEN ❌     │  │ │⚠️  Valorant is   │
│                 │  │ │    currently     │
└─────────────────┘  │ │    full (15/15)  │
                     └──────────────────┘
```

## 8. Error Handling Flow

```
┌──────────────────────────┐
│  API Call Initiated      │
│  fetch() with .then()    │
└──────────────┬───────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌───────────┐     ┌───────────┐
│ SUCCESS   │     │ ERROR     │
│ 200 OK    │     │ Network   │
│           │     │ or 500    │
│ Update    │     │           │
│ State ✅   │     │ Log error │
│           │     │ to console│
└───────────┘     │           │
                  │ UI still  │
                  │ works ✅   │
                  │ (graceful │
                  │ degradation)
                  └───────────┘
```

## 9. Deployment Architecture

```
┌──────────────────────────────────────────┐
│           Production Environment         │
├──────────────────────────────────────────┤
│                                          │
│  ┌─────────────────────────────────┐   │
│  │  Next.js Frontend (App Router)   │   │
│  │  ├── /register/page.tsx          │   │
│  │  ├── /components/                │   │
│  │  │   └── RegistrationForm.tsx ⭐  │   │
│  │  └── Runs in Browser             │   │
│  └─────────────┬───────────────────┘   │
│                │                       │
│                │ (1) Fetch Count       │
│                │                       │
│  ┌─────────────▼───────────────────┐   │
│  │  Next.js Backend (API Routes)    │   │
│  │  ├── /api/register/route.ts      │   │
│  │  ├── /api/                       │   │
│  │  │   └── module-registration-  │   │
│  │  │       count/route.ts ⭐       │   │
│  │  └── Runs on Server             │   │
│  └─────────────┬───────────────────┘   │
│                │                       │
│                │ (2) Query             │
│                │                       │
│  ┌─────────────▼───────────────────┐   │
│  │  Supabase PostgreSQL Database    │   │
│  │  ├── registrations table         │   │
│  │  │   ├── id (UUID)              │   │
│  │  │   ├── module (TEXT)          │   │
│  │  │   ├── status (TEXT)          │   │
│  │  │   └── ... more fields ...    │   │
│  │  └── Persistent Data Storage    │   │
│  └──────────────────────────────────┘   │
│                                          │
└──────────────────────────────────────────┘
```

## 10. Timeline - User Interaction

```
Time Event                          State
────────────────────────────────────────
 0s  User opens /register page
     
 1s  Page loads, component mounts
     useEffect runs                 Loading: true
     
 2s  API call sent to server        Waiting...
     
 3s  Database query executed        Querying DB...
     
 4s  Response received              Loading: false
     moduleRegistrationCounts = 12
     
 5s  Component re-renders
     Dropdown shows Valorant         Valorant visible
     Shows count: (12/15)
     
 10s User interacts with form
     Selects Valorant module
     Continues filling form
     
 30s Auto-refresh timer fires       Re-fetching...
     API called again
     
 31s New count received             Updated count
     (Could be 12 or 13)
     
 35s User fills all fields
     Clicks Submit
     
 36s Frontend validation runs
     Checks: formData.module == 'Valorant'
     Checks: count >= 15?
     Result: No (count is 12)
     ✅ Allow submission
     
 37s Form submitted to backend
     
 40s Registration saved             Success! ✅
     Confirmation email sent
     Modal shows
```

---

This documentation provides complete visual understanding of the system architecture and data flows.
