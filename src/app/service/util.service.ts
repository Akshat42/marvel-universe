import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }

  globalVotes = this.getGlobalVotes();
  currentUser: string = JSON.parse(<string>localStorage.getItem("currentUser")).userName;

  hideLoader(): void {
    document.getElementById("loader")!.style.display = "none";
  }

  getGlobalVotes(): any {
    let mapString = <string>localStorage.getItem("votes");
    return new Map(JSON.parse(mapString));
  }

  hasUpvoteId(heroId: number): boolean {
    let user = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (user) {
      return !!user.upvote.includes(heroId);
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

  removeUpVote(userObj: any, heroId: number, upvote: any): void {
    document.getElementById(heroId + "-like")!.style.color = "";
    let index = upvote.indexOf(heroId);
    upvote.splice(index, 1);
    userObj.upvote = upvote;
  }

  removeDownVote(userObj: any, heroId: number, downvote: any): void {
    document.getElementById(heroId + "-unlike")!.style.color = "";
    let index = downvote.indexOf(heroId);
    downvote.splice(index, 1);
    userObj.downvote = downvote;
  }

  addUpvote(userObj: any, heroId: number) {
    document.getElementById(heroId + "-like")!.style.color = "blue";
    userObj.upvote.push(heroId);
  }

  hasDownvoteId(heroId: number): boolean {
    let user = JSON.parse(<string>localStorage.getItem(this.currentUser));
    if (user) {
      return !!user.downvote.includes(heroId);
    }
    return false;
  }


}
