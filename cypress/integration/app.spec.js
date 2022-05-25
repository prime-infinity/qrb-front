describe('complete qrb test',()=>{
    
    beforeEach(() => {
        cy.visit('/')
      })

    it('application goes into loading',()=>{
        //check if application inits loading state
        cy.get('.spinner-border').should('exist')
    })

    it('index resturant state loads correctly',()=>{
        //check if auth is present in application
        //proceed to load resturant
        expect(localStorage.getItem('qrbauth')).to.eq(null)
        
        //ensure that values are null in redux state
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state)=>{
                //console.log(state);
                expect(state.rest.rest).to.be.eq(null)
                expect(state.auth.auth).to.be.eq(null)
            })

        //get a particular value from the index page
        cy.get('.videoBg').should('exist')

        //ensure that certain values are now present in index
        //page
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state)=>{
                //console.log(state);
                expect(state.auth.auth).to.be.eq(null)
                expect(state.rest.rest).to.be.a('object')
            })

    })
    it('home page renders correctly',()=>{
        cy.get('.videoBg').should('exist')
    })
    it('header component renders correctly',()=>{
        cy.get('#myHeader').should('exist')
    })
    it('application rediercts to about page when about button is clicked',()=>{
        //onclicking the info button,
        //app should redirec to about page
        cy.get('.videoBg').should('exist')
        cy.get('#to-about').click()
        cy.url().should('include', '/about')
       
    })
    it('application rediercts to menu page when menu button is clicked',()=>{
        //onclicking the info button,
        //app should redirec to about page
        cy.get('.videoBg').should('exist')
        cy.get('#to-menu').click()
        cy.url().should('include', '/menu')
       
    })
    it('side menu opens when hamburger menu is clicked, and closes back when overlay is clicked',()=>{
        //onclicking the hamburger button,
        //app should show side menu,
        //onclicking the side overlay,
        //should close menu
        cy.get('#myHeader').should('exist')
        cy.get('#show-mobile-menu').click()
        cy.get('.mobile-menu').should('exist')
        cy.get('.overlay').click()
       
    })
    it('side menu opens then toggle to business',()=>{
        //hamburger menu opens
        //on user toggle, it switches to business view
        cy.get('#rest-owner').should('not.exist') //should not exist by default
        cy.get('#myHeader').should('exist')
        cy.get('#show-mobile-menu').click()
        cy.get('.mobile-menu').should('exist')
        cy.get('#custom-switch').click()
        cy.get('#rest-owner').should('exist')
       
    })
    it('should redirect to login and render login page',()=>{
        cy.get('#show-mobile-menu').click()
        cy.get('.mobile-menu').should('exist')
        cy.get("#to-login").click()
        cy.url().should('include', '/login')
    })

    function login(){
        const data = {
            "_id": "6280603681e970e1511168b6",
            "field": "+2347082513520",
            "fieldType": 0,
            "isRestOwner": true,
            "createdAt": "2022-05-15T02:06:46.222Z",
            "updatedAt": "2022-05-15T02:32:14.253Z",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgwNjAzNjgxZTk3M58sTDkDw2hAz4Vk9xx6R8T4LvAqUS2UiOjAsImZpZWxkIjoiKzIzNDcwODI1MTM1MjAiLCJpc1Jlc3RPd25lciI6dHJ1ZSwiaWF0IjoxNjUzNTA3OTAwLCJleHAiOjE2NTYwOTk5MDB9.5nIMw-TuLveVFEDhPBOeslNDy85fUJO_YcqaR3hLnHM"
        }
        window.localStorage.setItem("qrbmauth", JSON.stringify(data));
    }

    it('login user by setting data to local storage',()=>{
        login()
    })
    it('login user can navigate to resturant editing part of menu',()=>{
        cy.get('#rest-owned').should('not.exist')//should not exist before clicking menu
        login() //login operation
        cy.get('#show-mobile-menu').click()
        cy.get('#custom-switch').click()
        cy.get('#rest-owned').should('exist')
    })
    it('can edit restuant summary',()=>{
        //here, the user navigates to 
        //the edit rest details, and then,
        //on typing on the text area to edit rest summary,
        //the update button shows up, onclicking it, a request
        //is send to update the rest summary
        login() //login operation
        cy.get('#show-mobile-menu').click()
        cy.get('#custom-switch').click()
        cy.get('#edit-info').click()
        cy.url().should('include', '/edit-resturant-details')
        cy.get('#text-summary').type('this is the resturant summary')
        cy.get('#summary-update').should('exist')  
    })
    it('can edit resturant images',()=>{
        login()

        cy.get('#show-mobile-menu').click();
        cy.get('#custom-switch').check();
        cy.get('#edit-info').click();
        cy.get(':nth-child(1) > .cover-item').click();
        
    })

    it('can edit resturant profile, first set of fields',()=>{
        login()
        cy.get('#show-mobile-menu').click();
        cy.get('#custom-switch').check();
        cy.get('#edit-info').click();
        cy.get('#to-edit-profile').click();
        cy.get('#rest-loc').type('resturant location');
        
        cy.get('#rest-yer').type('resturant year');
        
    })

    it('can edit resturant profile, second set of fields',()=>{
        login()
        cy.get('#show-mobile-menu > path').click();
        cy.get('#custom-switch').check();
        cy.get('#edit-info').click();
        cy.get('#to-edit-profile').click();
        cy.get('#second-set').click()
        cy.get('#add-phone').type('resturant phone');
        cy.get('#add-email').type('resturant email');
        cy.get('#add-web').type('resturant website');
        cy.get('#add-addrr').type('resturant address');
    })

})