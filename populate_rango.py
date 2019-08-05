import os
from django.core.files import File
os.environ.setdefault('DJANGO_SETTINGS_MODULE','HCSEDU.settings')

import django
django.setup()
from hcseduapp.models import UserProfile, Question, Finished_Questions, FreeTextQ, MultipleChoiceQ, LinkedQ1, LinkedQ2, AssertionReasonQ1, AssertionReasonQ2, AssertionReasonQ3
from django.contrib.auth.models import User

def populate():

    hcseduapp_users = [
        { "username": "alice",
          "password": "password",
          "user_profile":
          {
            "name" : "Alice A",
            "email": "alicea@gmail.com",
          },
        }
    ]


    hcseduapp_topics = [
        {"topic": "Social Engineering",
         "description": "Phishing attacks, in which scammers send emails and other messages to con victims into providing their login credentials and personal information, snare millions of victims each year. How to recognize? There are many ways to recognize if an email might be a phishing email: 1)	Grammar and language mistakes 2)	Urge the recipient to press a link 3)	The sender’s email address 4)	The actual URL underneath a link.       What should we do? If we received a phishing email, we should not click the link contained in the email or open the attachments. We need to report the suspicious email to the information security team of the organization and also inform other colleagues to be aware.",
        },
        {"topic": "Password Design",
         "description": "Why many companies require employees to change their passwords regularly? Many companies have a policy that employees should change their passwords every 30, 60, or 90 days. There are two reasons why this approach could improve the security. One is to defend the company data systems against being invaded because of some other website or company getting hit with a data breach. Since most users will reuse passwords on multiple websites, if one of these websites gets breached then the attackers now could login to many other websites too. By changing your password regularly, it is harder for attackers who have data from some other place use that information on your company’s network. The second reason is to protect against possible attacks against your company. Many usernames are combination of first and last names, or email addresses that are publicly available. It means that attackers can use multiple methods to try different combinations of potential passwords, along with the known username, to break into the company’s systems. Once they logged into the system, they can use the username and password obtained to access the sensitive information constantly. They will continue having access to the system until the user changes the password. By changing passwords regularly, this process becomes harder for the attackers to obtain and maintain access to the system.",
        },
        {"topic": "Side-channel Attack",
         "description": "Thermal attack: A thermal attack is an approach that exploits heat traces to uncover the entered credentials. During authentication, heat transfers from the users’ hands to the surface they are interacting with, leaving heat traces that can be analyzed using thermal cameras. Thermal attacks could be performed after the victim had authenticated, heat traces could be recovered and used to reconstruct the passwords. Smudge attack: An attacker exploits the oily residues left on the touch screen after interaction to uncover the password. Smudge attacks perform particularly well against patterns, as smudges provides hints on the order of PIN entries. Shoulder surfing: Shoulder surfing attacks means that an observer attempts to eavesdrop a user to uncover private information like login credentials.",
        },
        {"topic": "Malwares",
         "description": "A keylogger is a function which records or keystrokes on a computer. Attackers could use keyloggers would track the keystrokes to intercept passwords and other sensitive information typed in through the keyboard. They could get access to PIN codes and account numbers, passwords to online shopping sites, email ids, email logins, and other confidential information. There are many ways that keyloggers are spread: 1)	Keyloggers can be installed when a user clicks on a link or opens an attachment/file from a phishing mail. 2)	Keyloggers can be installed through webpage script. This is done by exploiting a vulnerable browser and the keylogger is launched when the user visits the malicious website. 3)	Keyloggers can exploit an infected system and is sometimes capable to download and install other malware to the system."
        },
    ]


    hcseduapp_questions = [
        {
            "questionid": 1,
            "description": "You are working in a business company which is about to launch their new business plan. You received an email that ask you to enter login details to update information. Should you trust this email and why? What should you do? ",
            "topic": "Social Engineering",
            "type": "Free Text",
            "image": "q1.jpg",
            "text": ,
            "answer": "You should not trust this email since it is a phishing message. The reasons are: 1)	The email address of the sender is not from PayPal (Acces@up.com). 2)	The greeting is quite general (We need your help). 3)	The grammar in the message is very poor and informal, which is always a strong indicator of a fraudulent message. 4)	If you hover over the “Update your information” button, it will reveal that the actual link is treebeard.mschosting.com. After recognizing this phishing email, you should not open or click any links in this email. Instead, you should report to the information security team of your organization and inform other colleagues to be aware." ,
            "score": 5,

        },
        {
            "questionid": 2,
            "description": "Your company has a policy that requires you to change your password every 90 days. Now you need to change your password to a new one for the next 90 days, which one would you prefer?",
            "topic": "Password Design",
            "type": "Multiple Choice",
            "explanation": "There are many approaches to make password stronger: 1)	Comply with password policies. Policies requiring the combination of upper case, lower case, digits, symbols and minimum password length. 2)	Use password meters. Many websites use password meters to give users feedback when they create their passwords. 3)	Do not reuse passwords. 4)	Make passwords long and unpredictable. 5)	Use password managers. 6)	Use multi-factor authentication. Authentication that combine password and fingerprint. ",
            "MultipleChoiceQ":
            {
                "opno": "A",
                "opcontent": "Ignore the policy and continue using the old password since it is easier to remember",
                "opscore": 0,
                "explanation": "If you use the same password on multiple websites and you do not change the password on the company system, attackers could gain access to the company system using the same password they obtained from an invaded website. By changing password regularly, it is harder for attackers who have data from other place use that information on your company’s network.",
            },
            {
                "opno": "B",
                "opcontent": "Make modifications to the old password like adding numbers to the old password to make it a new one",
                "opscore": 1,
                "explanation": "If you only change the password by adding numbers to the string, attackers could use brute force guesses to try all the possible combinations and decode the password.",
            },
            {
                "opno": "C",
                "opcontent": "Change the password to a family member’s name",
                "opscore": 1,
                "explanation": "If you use friends’ or family members’ name as the password, attackers could easily find this information since their names are publicly available.",
            },
            {
                "opno": "D",
                "opcontent": "Change the password to a complicated one that has met the password policy requirements but you need to write it down on a memo",
                "opscore": 1,
                "explanation": "It is understandable that you want to write down the password on a memo if you choose a complicated one because human capabilities are limited. However, there might be a risk involving how you store the memo. If you do not keep the memo in a secure location that you have control over or you left it on the desk in the office, it is possible that your sensitive information is exposed to colleagues and they might compromise your privacy. The mitigation is that you can use password manager applications to store your password while make it complicated.",
            },
            {
                "opno": "E",
                "opcontent": "Change the password using a common word like “incorrect” so if you forget the password the system will tell you “your password is incorrect”.",
                "opscore": 1,
                "explanation": "If you use common words as password, attackers could use common word attacks or dictionary attacks to decrypt the password. Common word attacks are a simple form of brute force attacks, where the attacker attempts to login in using a list of common words. Dictionary attacks are similar to common word attacks. The attacker would use the full dictionary of words to guess the password.",
            },
        },
        {
            "description": "Choose the password that you think that has the highest security level among them and as many of the following reasons as apply for that:",
            "topic": "Password Design",
            "type": "Assertion Reason",
            "explanation": "There are many approaches to make password stronger: 1)	Comply with password policies. Policies requiring the combination of upper case, lower case, digits, symbols and minimum password length. 2)	Use password meters. Many websites use password meters to give users feedback when they create their passwords. 3)	Do not reuse passwords. 4)	Make passwords long and unpredictable. 5)	Use password managers. 6)	Use multi-factor authentication. Authentication that combine password and fingerprint. ",
            "AssertionReasonQ1":
            {
                "asno": "A",
                "ascontent": "123456789101112131415",
            }

        }

    ]
