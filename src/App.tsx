// SecureMail UI Simulator - Enhanced Version
// Features: Inbox UI + Filtering + Role-Based Access + Search + Responsive Design + Email Actions

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Types
type EmailFolder = 'Inbox' | 'Spam' | 'Archived';
type UserRole = 'Admin' | 'User';
type FilterOption = 'All' | EmailFolder;

interface Email {
  id: number;
  subject: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  folder: EmailFolder;
  role: UserRole;
}

// Sample Email Data with more realistic content
const sampleEmails: Email[] = [
  { 
    id: 1, 
    subject: 'Welcome to SecureMail!', 
    sender: 'noreply@securemail.com', 
    content: 'Thank you for signing up to SecureMail. We\'re excited to have you on board!',
    timestamp: '2025-04-30T10:23:00',
    read: false,
    folder: 'Inbox', 
    role: 'User' 
  },
  { 
    id: 2, 
    subject: 'Security Update', 
    sender: 'admin@securemail.com', 
    content: 'We have updated our security protocols. Please review the changes.',
    timestamp: '2025-04-29T14:15:00',
    read: true,
    folder: 'Spam', 
    role: 'Admin' 
  },
  { 
    id: 3, 
    subject: 'Monthly Report', 
    sender: 'hr@company.com', 
    content: 'Please find attached the monthly activity report for April 2025.',
    timestamp: '2025-04-28T09:45:00',
    read: true,
    folder: 'Archived', 
    role: 'User' 
  },
  { 
    id: 4, 
    subject: 'Password Change Required', 
    sender: 'security@securemail.com', 
    content: 'Your password will expire in 3 days. Please update it at your earliest convenience.',
    timestamp: '2025-04-30T08:30:00',
    read: false,
    folder: 'Inbox', 
    role: 'Admin' 
  },
  { 
    id: 5, 
    subject: 'Team Meeting - May 2nd', 
    sender: 'manager@company.com', 
    content: 'Reminder: We have our team sync on Friday at 10AM. Please prepare your updates.',
    timestamp: '2025-04-30T11:20:00',
    read: false,
    folder: 'Inbox', 
    role: 'User' 
  },
  { 
    id: 6, 
    subject: 'Your Account Statement', 
    sender: 'billing@securemail.com', 
    content: 'Your monthly account statement is now available for download.',
    timestamp: '2025-04-27T16:05:00',
    read: true,
    folder: 'Inbox', 
    role: 'User' 
  },
  { 
    id: 7, 
    subject: 'System Maintenance Notice', 
    sender: 'system@securemail.com', 
    content: 'The system will be undergoing maintenance on May 5th from 1AM to 3AM UTC.',
    timestamp: '2025-04-29T18:45:00',
    read: false,
    folder: 'Inbox', 
    role: 'Admin' 
  },
];

// Components
const EmailDetail: React.FC<{ email: Email | null, onClose: () => void, onMove: (id: number, folder: EmailFolder) => void }> = ({ email, onClose, onMove }) => {
  if (!email) return null;
  
  return (
    <DetailOverlay>
      <DetailContainer>
        <DetailHeader>
          <h2>{email.subject}</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DetailHeader>
        <DetailInfo>
          <strong>From:</strong> {email.sender}
          <br />
          <strong>Date:</strong> {new Date(email.timestamp).toLocaleString()}
          <br />
          <strong>Folder:</strong> {email.folder}
        </DetailInfo>
        <DetailContent>{email.content}</DetailContent>
        <ActionButtons>
          <Button onClick={() => onMove(email.id, 'Archived')}>Archive</Button>
          {email.folder !== 'Spam' ? (
            <Button onClick={() => onMove(email.id, 'Spam')}>Mark as Spam</Button>
          ) : (
            <Button onClick={() => onMove(email.id, 'Inbox')}>Not Spam</Button>
          )}
        </ActionButtons>
      </DetailContainer>
    </DetailOverlay>
  );
};

// Main App Component
const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(sampleEmails);
  const [filter, setFilter] = useState<FilterOption>('All');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole>('User');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter emails based on current criteria
  const filteredEmails = emails.filter(
    (email) =>
      (filter === 'All' || email.folder === filter) &&
      (email.subject.toLowerCase().includes(search.toLowerCase()) ||
        email.sender.toLowerCase().includes(search.toLowerCase()) ||
        email.content.toLowerCase().includes(search.toLowerCase())) &&
      email.role === role
  );

  // Handle email selection
  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    
    // Mark as read when opened
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
  };

  // Move email to different folder
  const handleMoveEmail = (id: number, newFolder: EmailFolder) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, folder: newFolder } : email
    ));
    setSelectedEmail(null);
  };

  // Get unread count 
  const unreadCount = emails.filter(email => 
    email.role === role && email.folder === 'Inbox' && !email.read
  ).length;

  return (
    <Container>
      <Header>
        <Title>SecureMail UI Simulator</Title>
        <RoleSelector>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
        </RoleSelector>
      </Header>

      {loading ? (
        <LoadingIndicator>Loading emails...</LoadingIndicator>
      ) : (
        <AppLayout>
          <Sidebar>
            <FolderList>
              <FolderItem 
                active={filter === 'All'} 
                onClick={() => setFilter('All')}
              >
                All
              </FolderItem>
              <FolderItem 
                active={filter === 'Inbox'} 
                onClick={() => setFilter('Inbox')}
              >
                Inbox {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
              </FolderItem>
              <FolderItem 
                active={filter === 'Spam'} 
                onClick={() => setFilter('Spam')}
              >
                Spam
              </FolderItem>
              <FolderItem 
                active={filter === 'Archived'} 
                onClick={() => setFilter('Archived')}
              >
                Archived
              </FolderItem>
            </FolderList>
          </Sidebar>

          <MainContent>
            <SearchBar>
              <input
                type="text"
                placeholder="Search emails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBar>

            <EmailList>
              {filteredEmails.length === 0 ? (
                <EmptyState>No emails match your criteria.</EmptyState>
              ) : (
                filteredEmails.map((email) => (
                  <EmailCard 
                    key={email.id} 
                    unread={!email.read}
                    onClick={() => handleEmailClick(email)}
                  >
                    <EmailHeader>
                      <Subject unread={!email.read}>{email.subject}</Subject>
                      <TimeStamp>{new Date(email.timestamp).toLocaleDateString()}</TimeStamp>
                    </EmailHeader>
                    <Sender>{email.sender}</Sender>
                    <Preview>{email.content.slice(0, 80)}...</Preview>
                    <FolderLabel folder={email.folder}>{email.folder}</FolderLabel>
                  </EmailCard>
                ))
              )}
            </EmailList>
          </MainContent>
        </AppLayout>
      )}

      {selectedEmail && (
        <EmailDetail 
          email={selectedEmail} 
          onClose={() => setSelectedEmail(null)} 
          onMove={handleMoveEmail}
        />
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
`;

const RoleSelector = styled.div`
  select {
    margin-left: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FolderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface FolderItemProps {
  active: boolean;
}

const FolderItem = styled.li<FolderItemProps>`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.active ? '#e3f2fd' : 'transparent'};
  color: ${props => props.active ? '#1976d2' : '#555'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.active ? '#e3f2fd' : '#f1f1f1'};
  }
`;

const Badge = styled.span`
  background-color: #f44336;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  font-weight: bold;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchBar = styled.div`
  margin-bottom: 1rem;
  
  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }
  }
`;

const EmailList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

interface EmailCardProps {
  unread: boolean;
}

const EmailCard = styled.div<EmailCardProps>`
  border: 1px solid #eaeaea;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  background: ${props => props.unread ? '#f9f9f9' : 'white'};
  position: relative;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const EmailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

interface SubjectProps {
  unread: boolean;
}

const Subject = styled.h3<SubjectProps>`
  margin: 0;
  font-size: 1rem;
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
`;

const TimeStamp = styled.span`
  color: #777;
  font-size: 0.8rem;
`;

const Sender = styled.div`
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Preview = styled.p`
  color: #777;
  margin: 0;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FolderLabelProps {
  folder: EmailFolder;
}

const FolderLabel = styled.span<FolderLabelProps>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${props => {
    switch(props.folder) {
      case 'Inbox': return '#e3f2fd';
      case 'Spam': return '#ffebee';
      case 'Archived': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.folder) {
      case 'Inbox': return '#1976d2';
      case 'Spam': return '#c62828';
      case 'Archived': return '#616161';
      default: return '#616161';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #777;
`;

const DetailOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DetailContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
    color: #2c3e50;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
  
  &:hover {
    color: #333;
  }
`;

const DetailInfo = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
`;

const DetailContent = styled.div`
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #1565c0;
  }
`;

export default App;