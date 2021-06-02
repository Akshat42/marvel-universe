import {AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Hero} from "../../../model/hero";
import {UtilService} from "../../../service/util.service";


@Component({
  selector: 'mu-popular-container',
  templateUrl: './popular-container.component.html',
  styleUrls: ['./popular-container.component.scss']
})
export class PopularContainerComponent implements OnInit {

  heroes!: Hero[];
  upVoteColor: string = "blue";
  defaultColor: string = "none";
  downVoteColor: string = "red";

  currentUser: string = JSON.parse(<string>localStorage.getItem("currentUser")).userName;
  constructor(private heroDataService: HeroDataService,
              private utilService: UtilService
  ) {
   }

  getGlobalVotes(): any {
    let mapString = <string>localStorage.getItem("votes");
    let voteMap = new Map(JSON.parse(mapString));
    return [...voteMap.values()];
  }

  hasUpvoteId(heroId: number): boolean {
    let user = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (user) {
      if (user.upvote.includes(heroId)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  hasDownvoteId(heroId: number): boolean {
    let user = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (user) {
      if (user.downvote.includes(heroId)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  getUpvote(): any {
    return JSON.parse(<string>localStorage.getItem(this.currentUser)).upvote;
  }

  getDownVote(): any {
    return JSON.parse(<string>localStorage.getItem(this.currentUser)).downvote;
  }

  addGlobalVote(heroId: number): void {
    let votes;
    let votesString = <string>localStorage.getItem("votes");
    if (votesString) {
      votes = new Map(JSON.parse(votesString));
      if (votes.has(heroId)) {
        let voteCount = Number(votes.get(heroId));
        voteCount++;
        votes.set(heroId, voteCount);
      } else {
        votes.set(heroId, 1);
      }
    } else {
      votes = new Map();
      votes.set(heroId, 1);
    }
    localStorage.setItem("votes", JSON.stringify([...votes]));
  }

  subtractGlobalVote(heroId: number): void {
    let votes;
    let votesString = <string>localStorage.getItem("votes");
    if (votesString) {
      votes = new Map(JSON.parse(votesString));
      if (votes.has(heroId)) {
        let voteCount = Number(votes.get(heroId));
        voteCount--;
        votes.set(heroId, voteCount);
      } else {
        votes.set(heroId, -1);
      }
    } else {
      votes = new Map();
      votes.set(heroId, -1);
    }
    localStorage.setItem("votes", JSON.stringify([...votes]));
  }

  upVoteChecker(heroId: number): void {

    let upvote = this.getUpvote();
    let downvote = this.getDownVote();
    let userObj = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (downvote.includes(heroId)) {
      document.getElementById(heroId + "-unlike")!.style.color = "";
      let index = downvote.indexOf(heroId);
      downvote.splice(index, 1);
      userObj.downvote = downvote;
    }
    if (upvote.includes(heroId)) {
      document.getElementById(heroId + "-like")!.style.color = "";
      let index = upvote.indexOf(heroId);
      upvote.splice(index, 1);
      userObj.upvote = upvote;
      this.subtractGlobalVote(heroId);
    } else {
      this.addGlobalVote(heroId);
      document.getElementById(heroId + "-like")!.style.color = "blue";
      userObj.upvote.push(heroId)
    }
    localStorage.setItem(this.currentUser, JSON.stringify(userObj));
  }

  downVoteChecker(heroId: number): void {
    let downvote = this.getDownVote();
    let upvote = this.getUpvote();
    let userObj = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (upvote.includes(heroId)) {
      document.getElementById(heroId + "-like")!.style.color = "";
      let index = upvote.indexOf(heroId);
      upvote.splice(index, 1);
      userObj.upvote = upvote;
    }
    if (downvote.includes(heroId)) {
      document.getElementById(heroId + "-unlike")!.style.color = "";
      let index = downvote.indexOf(heroId);
      downvote.splice(index, 1);
      userObj.downvote = downvote;
      this.addGlobalVote(heroId);
    } else {
      this.subtractGlobalVote(heroId);
      document.getElementById(heroId + "-unlike")!.style.color = "red";
      userObj.downvote.push(heroId)
    }
    localStorage.setItem(this.currentUser, JSON.stringify(userObj));
  }
  // upVoteCheckerWrapper(heroId : number) {
  //   this.utilService.upVoteChecker(heroId);
  // }
  //
  // hasUpvoteIdWrapper(heroId:number) {
  //   this.utilService.hasDownvoteId(heroId);
  // }

  sortByVote(): any {
    let votes = this.getGlobalVotes();
    console.log(votes);
    return votes.sort();
  }





  ngOnInit(): void {
    this.heroDataService.getPopularHeroes()
      .subscribe(
        heroes => {
          this.heroes = [];
          heroes.forEach((hero: any) => {
            this.heroes.push({
              description: hero.description,
              id: hero.id,
              modified: hero.modified,
              name: hero.name,
              imageUrl: hero.thumbnail.path + "." + hero.thumbnail.extension
            });
          });
          this.utilService.hideLoader();
        },
        error => console.log(error)
      );
  }











}
